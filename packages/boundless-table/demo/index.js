import Table from '../index';

const rows = require('./fixture.json');
const columns = [{
    cellChangeFunc: (cellElement, before, after) => {
        cellElement.style.backgroundColor = `rgba(${after}, ${after}, ${after}, 0.5)`;
    },
    children: [{
        tag: 'div',
        attributes: {'data-foo': 'bar'},
        className: 'extra-spooky-column',
        onclick: (e) => {
            e.stopImmediatePropagation();

            // eslint-disable-next-line no-alert
            alert('boo!');
        },
        children: '👻',
    }, {
        tag: 'div',
        attributes: {'data-foo': 'baz'},
        className: 'extra-unusual-column',
        onclick: (e) => {
            e.stopImmediatePropagation();

            // eslint-disable-next-line no-alert
            alert('squark!');
        },
        children: '👽',
    }],
    title: 'ID',
    mapping: 'id',
    resizable: true,
}, {
    title: 'First Name',
    mapping: 'first_name',
    resizable: true,
}, {
    title: 'Last Name',
    mapping: 'last_name',
    resizable: true,
}, {
    title: 'Job Title',
    mapping: 'job_title',
    resizable: true,
}, {
    title: 'Phone',
    mapping: 'phone',
    resizable: false,
}, {
    title: 'Email Address',
    mapping: 'email',
    resizable: true,
}, {
    title: 'Street Address',
    mapping: 'address1',
    resizable: true,
}, {
    title: 'City',
    mapping: 'city',
    resizable: true,
}, {
    title: 'Country',
    mapping: 'country',
    resizable: true,
}, {
    title: 'Country Code',
    mapping: 'country_code',
    resizable: true,
}];

const getRow = (index) => {
    if (index > 800) {
        return new Promise((resolve) => {
            window.setTimeout((setIndex) => {
                resolve(rows[setIndex]);
            }, 2000, index);
        });
    }

    return rows[index];
};

const t = new Table({
    getRow,
    columns,
    headerColumnClickFunc: (event, mapping) => {
        // eslint-disable-next-line no-alert
        alert(`${mapping} was clicked.`);
    },
    preserveScrollState: true,
    rowChangeFunc: (rowElement, value) => (rowElement.style.backgroundColor = `rgba(${value.id}, ${value.id}, ${value.id}, 0.5)`),
    rowClickFunc: () => {
        // eslint-disable-next-line no-alert
        alert('clicked');
    },
    throttleInterval: 200,
    totalRows: rows.length,

    wrapper: document.querySelector('.b-table-wrapper'),
    header: document.querySelector('.b-table-header'),
    body: document.querySelector('.b-table-body'),
    aria: document.querySelector('.b-offscreen'),
    'x-scroll-track': document.querySelector('.b-table-x-scroll-track'),
    'y-scroll-track': document.querySelector('.b-table-y-scroll-track'),
    'x-scroll-handle': document.querySelector('.b-table-x-scroll-handle'),
    'y-scroll-handle': document.querySelector('.b-table-y-scroll-handle'),
});

window.t = t;
