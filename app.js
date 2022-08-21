const lists = ['Книги', 'Программирование', 'Фильмы', 'Музыка'];

const element = (tag, classes, content, set) => {
  const node = document.createElement(tag);
  if (classes.length) {
    node.classList.add(...classes);
  }

  if (content) {
    node.textContent = content;
  }

  if (set) {
    node.dataset.button = set;
  }

  return node;
};

const selector = (tag) => {
  return document.querySelector(tag);
};

const createDropDownList = () => {
  const dropdownList = element('ul', ['dropdown__list']);
  const dropdownButton = element(
    'button',
    ['dropdown__button'],
    'Книги',
    'Button'
  );
  const dropdown = selector('.dropdown');

  dropdown.insertAdjacentElement('beforeend', dropdownButton);

  dropdownList.insertAdjacentHTML(
    'beforeend',
    `
    ${lists
      .map((list) => {
        return `<li class="dropdown__list-item">${list}</li>`;
      })
      .join('')}
  `
  );

  dropdown.insertAdjacentElement('beforeend', dropdownList);

  return dropdown;
};

const method = (dropdownList, button, listItem) => {
  return {
    onToggle() {
      dropdownList.classList.toggle('dropdown__list--visible');
      button.classList.add('dropdown__button--visible');
    },
    setUp() {
      button.textContent = listItem.textContent;
      dropdownList.classList.remove('dropdown__list--visible');
      button.classList.remove('dropdown__button--visible');
    },
    windowClose() {
      dropdownList.classList.remove('dropdown__list--visible');
      button.classList.remove('dropdown__button-active');
    },
  };
};

const dropdownWork = () => {
  const dropdown = createDropDownList();
  const dropdownList = dropdown.querySelector('.dropdown__list');
  const button = dropdown.querySelector('.dropdown__button');
  const dropdownListItem = dropdownList.querySelectorAll(
    '.dropdown__list-item'
  );

  button.addEventListener('click', (event) => {
    if (event.target.dataset.button) {
      method(dropdownList, button).onToggle();
    }
  });

  dropdownListItem.forEach((listItem) => {
    listItem.addEventListener('click', () => {
      method(dropdownList, button, listItem).setUp();
    });
  });

  document.addEventListener('click', (event) => {
    if (event.target !== button) {
      method(dropdownList, button).windowClose();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'Tab') {
      method(dropdownList, button).windowClose();
    }
  });
};

dropdownWork();
