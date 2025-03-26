export const sortByName = (arr, order = 'asc') => {
  return arr.sort((a, b) => {
    const lastNameA = a.name.split(' ')[0]; 
    const lastNameB = b.name.split(' ')[0];

    return order === 'asc'
      ? lastNameA.localeCompare(lastNameB)
      : lastNameB.localeCompare(lastNameA);
  });
};

export const sortArray = (arr, field, order = 'asc') => {
  return arr.slice().sort((a, b) => {
    const lengthA = Array.isArray(a[field]) ? a[field].length : 0;
    const lengthB = Array.isArray(b[field]) ? b[field].length : 0;

    return order === 'asc' ? lengthA - lengthB : lengthB - lengthA;
  });
};

