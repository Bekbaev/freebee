export default function (value) {
    return `${new Intl.NumberFormat('ru-RU').format((value))}`;
}