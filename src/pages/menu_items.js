import { localize } from '../utils';

const menuItems = [
    {
        title : localize({'ru' : 'Главная', 'en' : 'Home'}),
        slug : '',
        href : '/'
    },
    {
        title : localize({'ru' : 'Добавить опрос', 'en' : 'Add poll'}),
        slug : 'new',
        href : '/new'
    }
];

export default menuItems;