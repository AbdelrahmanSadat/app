export const fruits = [
    {
        id: 0,
        name: 'Watermelon',
        price: 30,
        servingSize: '1KG',
        inventorySize: 10,
        img: 'watermelon.png',
    },
    {
        id: 1,
        name: 'Kiwi',
        price: 30,
        servingSize: '1KG',
        inventorySize: 10,
        img: 'kiwi.png',
    },
    {
        id: 2,
        name: 'Apples',
        price: 30,
        servingSize: '1KG',
        inventorySize: 10,
        img: 'apple.png',
    },
    {
        id: 3,
        name: 'Mango',
        price: 30,
        servingSize: '1KG',
        inventorySize: 10,
        img: 'mango.png',
    },
    
]

export type Fruit = typeof fruits[number]

export type Fruits = Fruit[]