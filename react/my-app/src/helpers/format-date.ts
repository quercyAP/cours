const formatDate = (date: Date = new Date()): string => {
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
};

export default formatDate;