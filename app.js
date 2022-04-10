const data = [
    {
        id: 3,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:34:30.000Z'
    },
    {
        id: 5,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:33:00.000Z'
    },
    {
        id: 6,
        sourceAccount: 'A',
        targetAccount: 'C',
        amount: 250,
        category: 'other',
        time: '2018-03-02T10:33:05.000Z'
    },
    {
        id: 4,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:36:00.000Z'
    },
    {
        id: 2,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:33:50.000Z'
    },
    {
        id: 1,
        sourceAccount: 'A',
        targetAccount: 'C',
        amount: 250,
        category: 'other',
        time: '2018-03-02T10:33:00.000Z'
    }
];

const areDuplicates = (transaction1, transaction2) => {
    return Math.abs(new Date(transaction1.time) - new Date(transaction2.time))/1000 < 60;
}

const findDuplicateTransactions = (transactions) => {

    //group by sourceAccount,targetAccount,amount,category
    const groups = Object.values(
        transactions.reduce((result, item) => {
            const key = `${item.sourceAccount}${item.targetAccount}${item.amount}${item.category}`;
            return {...result, [key]: [...(result[key] || []), item]};
        }, {})
    );


    const result = []
    groups
        .map(group =>group.sort((a, b) => new Date(a.time) - new Date(b.time)))
        .filter(group => group.length > 1)
        .forEach(group => {
            const [first] = group;
            const duplicates = group
                .filter((item, index) => index > 0 && areDuplicates(item, group[index - 1]));
            if (duplicates.length > 0) {
                result.push([first, ...duplicates]);
            }
    });

    return result.sort((a, b) => new Date(a[0].time) - new Date(b[0].time));
}


console.log(findDuplicateTransactions(data));