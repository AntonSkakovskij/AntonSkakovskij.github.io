const deleteMessagePopup = document.querySelector('.delete-student-message')
const studentPopup = document.querySelector('.edit-add-student-message');

const studentsTable = document.querySelector('.student-table')

let currentRowToDelete = null;
let currentRowToEdit = null;
let isEditing = false;

let students = [];

class Student{


    static idCounter = 0;

    constructor(group, firstName, lastName, gender, birthday) {
        this.id = Student.idCounter++;
        this.group = group;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.birthday = birthday;
    }
}

function openStudentPopup(title) {
    studentPopup.querySelector('#modalTitle').textContent = title;
    studentPopup.style.opacity = '1';
    studentPopup.style.visibility = 'visible';
}

function exitStudentPopup() {
    studentPopup.style.visibility = 'hidden';
    studentPopup.style.opacity = '0';
    isEditing = false;

    // Очищення полів вводу
    // Встановлення першого значення для поля group-name
    const groupDropdown = studentPopup.querySelector('.group-name');
    groupDropdown.value = groupDropdown.options[0].value;

    // Встановлення першого значення для поля gender
    const genderDropdown = studentPopup.querySelector('.gender');
    genderDropdown.value = genderDropdown.options[0].value;


    studentPopup.querySelector('.first-name').value = '';
    studentPopup.querySelector('.last-name').value = '';
    studentPopup.querySelector('.date').value = '';

}

function confirmStudentAction(event) {
    const groupName = studentPopup.querySelector('.group-name').value;
    const firstName = studentPopup.querySelector('.first-name').value;
    const lastName = studentPopup.querySelector('.last-name').value;
    const gender = studentPopup.querySelector('.gender').value;
    const birthday = studentPopup.querySelector('.date').value;

    if (isEditing) {
        currentRowToEdit.cells[1].textContent = groupName;
        currentRowToEdit.cells[2].textContent = firstName + ' ' + lastName;
        currentRowToEdit.cells[3].textContent = gender;
        currentRowToEdit.cells[4].textContent = birthday;
    } else {
        if(!submitClick(event)){
            return false
        }
        const student = new Student(groupName, firstName, lastName, gender, birthday);

        const newRow = document.createElement('tr');
        newRow.student = student; // Прив'язка студента до рядка
        newRow.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${groupName}</td>
                <td>${firstName} ${lastName}</td>
                <td>${gender}</td>
                <td>${birthday}</td>
                <td><div class="status-icon"></div></td>
                <td>
                    <button onclick="openStudentPopup('Edit student'); fillStudentForm(this);" class="button small-button edit-table-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                    </button>
                    <button onclick="openDeleteMessagePopup(this)" class="button small-button delete-table-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="close-button bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                </td>
            `;
        studentsTable.appendChild(newRow);
    }

    exitStudentPopup();
}

const firstNameInput = studentPopup.querySelector('.first-name');
const lastNameInput = studentPopup.querySelector('.last-name');
const dateInput = studentPopup.querySelector('.date');
function submitClick(event) {S
    let invalidInputCounter = 0;


    if (firstNameInput.value.trim() === "") {
        firstNameInput.style.fontSize = "16px";
        firstNameInput.placeholder = "Field can't be empty";
        firstNameInput.style.border = "3px solid red"; // Встановлюємо рамку червоною
        invalidInputCounter++;
    }

    if (lastNameInput.value.trim() === "") {
        lastNameInput.style.fontSize = "16px";
        lastNameInput.placeholder = "Field can't be empty";
        lastNameInput.style.border = "3px solid red";
        invalidInputCounter++;
    }

    if (dateInput.value.trim() === "") {
        dateInput.style.border = "3px solid red"; // Встановлюємо рамку червоною
        invalidInputCounter++;
    }


    if (invalidInputCounter !== 0) {
        event.preventDefault(); // Відмінити подію, якщо є неправильні поля
    }
}

firstNameInput.addEventListener('focus', function () {
    this.style.fontSize = ''; // Скидаємо розмір шрифту до значення за замовчуванням
    this.placeholder = ''; // Скидаємо placeholder
    this.style.border = ''; // Скидаємо рамку
});

lastNameInput.addEventListener('focus', function () {
    this.style.fontSize = ''; // Скидаємо розмір шрифту до значення за замовчуванням
    this.placeholder = ''; // Скидаємо placeholder
    this.style.border = ''; // Скидаємо рамку
});

dateInput.addEventListener('focus', function () {
    this.style.fontSize = ''; // Скидаємо розмір шрифту до значення за замовчуванням
    this.style.border = ''; // Скидаємо рамку
});




function fillStudentForm(button) {
    isEditing = true;
    const row = button.closest('tr');
    currentRowToEdit = row;

    const groupName = row.cells[1].textContent;
    const fullName = row.cells[2].textContent;
    const gender = row.cells[3].textContent;
    const birthday = row.cells[4].textContent;

    studentPopup.querySelector('.group-name').value = groupName;
    studentPopup.querySelector('.first-name').value = fullName.split(' ')[0];
    studentPopup.querySelector('.last-name').value = fullName.split(' ')[1];
    studentPopup.querySelector('.gender').value = gender;
    studentPopup.querySelector('.date').value = birthday;

    openStudentPopup('Edit student');
}


function openDeleteMessagePopup(button) {

    const row = button.closest('tr')
    const fullName = row.cells[2].textContent

    currentRowToDelete = row
    deleteMessagePopup.querySelector('.fullname-to-delete').textContent = fullName


    deleteMessagePopup.style.visibility = 'visible';
    deleteMessagePopup.style.opacity = '1';
}

/*вихід з вікна при натиску на хрестик з вікна видалення студентів*/
function exitDeleteMessagePopup() {
    deleteMessagePopup.style.visibility = 'hidden';
    deleteMessagePopup.style.opacity = '0';
}


function confirmDeletingStudent() {
    // Отримуємо індекс елемента, який потрібно видалити
    const index = students.findIndex(student => student === currentRowToDelete.student);

    // Видаляємо елемент з масиву за його індексом
    if (index !== -1) {
        students.splice(index, 1);
    }

    currentRowToDelete.remove();

    deleteMessagePopup.style.visibility = 'hidden';
    deleteMessagePopup.style.opacity = '0';
}



