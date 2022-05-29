import olympus from "./../../../assets/images/olympus.jpg";
import image from "../../../assets/images/marijuana.jpg";

export const shops = [
    {
        _id: 1,
        owner: {
            fullName: 'Inigo Lopez',
            _id: '',
            phone: '+233270048319'
        },
        contact: {
            phone: '+233270048319',
            email: 'dev.stanley.hayford@gmail.com'
        },
        name: 'Olympus',
        description: 'We sell the best edibles home prepared for your personal satisfaction',
        status: 'verified',
        rating: {
            average: 5,
            count: 190,
            details: {
                'five': 50,
                'four': 30,
                'three': 10,
                'two': 7,
                'one': 3
            }
        },
        productCount: 9,
        image: olympus,
        products: [
            {
                _id: 1,
                shop: {
                    name: 'Olympus'
                },
                rating: 4.9,
                owner: {
                    fullName: 'Stanley Hayford'
                },
                price: {
                    amount: 50,
                    currency: 'GHS'
                },
                description: 'Quality high grade imported straight from california',
                strain: 'Indica',
                status: 'Featured',
                image,
                type: 'Euphoria',
                name: 'Indian Hemp California',
                variant: 'weed',
                heritage: 'Foreign'
            },
            {
                _id: 2,
                shop: {
                    name: 'Olympus'
                },
                rating: 4.9,
                owner: {
                    fullName: 'Stanley Hayford'
                },
                price: {
                    amount: 50,
                    currency: 'GHS'
                },
                description: 'Quality high grade imported straight from california',
                strain: 'Indica',
                status: 'Featured',
                image,
                type: 'Euphoria',
                name: 'Indian Hemp California',
                variant: 'weed',
                heritage: 'Foreign'
            },
            {
                _id: 3,
                shop: {
                    name: 'Olympus'
                },
                rating: 4.9,
                owner: {
                    fullName: 'Stanley Hayford'
                },
                price: {
                    amount: 50,
                    currency: 'GHS'
                },
                description: 'Quality high grade imported straight from california',
                strain: 'Indica',
                status: 'Featured',
                image,
                type: 'Euphoria',
                name: 'Indian Hemp California',
                variant: 'weed',
                heritage: 'Foreign'
            },
            {
                _id: 4,
                shop: {
                    name: 'Olympus'
                },
                rating: 4.9,
                owner: {
                    fullName: 'Stanley Hayford'
                },
                price: {
                    amount: 50,
                    currency: 'GHS'
                },
                description: 'Quality high grade imported straight from california',
                strain: 'Indica',
                status: 'Featured',
                image,
                type: 'Euphoria',
                name: 'Indian Hemp California',
                variant: 'weed',
                heritage: 'Foreign'
            },
            {
                _id: 5,
                shop: {
                    name: 'Olympus'
                },
                rating: 4.9,
                owner: {
                    fullName: 'Stanley Hayford'
                },
                price: {
                    amount: 50,
                    currency: 'GHS'
                },
                description: 'Quality high grade imported straight from california',
                strain: 'Indica',
                status: 'Featured',
                image,
                type: 'Euphoria',
                name: 'Indian Hemp California',
                variant: 'weed',
                heritage: 'Foreign'
            },
            {
                _id: 6,
                shop: {
                    name: 'Olympus'
                },
                rating: 4.9,
                owner: {
                    fullName: 'Stanley Hayford'
                },
                price: {
                    amount: 50,
                    currency: 'GHS'
                },
                description: 'Quality high grade imported straight from california',
                strain: 'Indica',
                status: 'Featured',
                image,
                type: 'Euphoria',
                name: 'Indian Hemp California',
                variant: 'weed',
                heritage: 'Foreign'
            },
        ],
        createdAt: new Date(2020, 4, 5),
        updatedAt: new Date(2020, 4, 5),
        reviews: [
            {
                user: {
                    fullName: 'Inigo Lopez',
                },
                rating: 4.5,
                text: 'The best shop to get authentic clean exotic and local kush. Best shop ever!!!',
                createdAt: new Date(2021, 3, 23)
            },
            {
                user: {
                    fullName: 'Inigo Lopez',
                },
                rating: 4.5,
                text: 'The best shop to get authentic clean exotic and local kush. Best shop ever!!!',
                createdAt: new Date(2021, 3, 23)
            },
            {
                user: {
                    fullName: 'Inigo Lopez',
                },
                rating: 4.5,
                text: 'The best shop to get authentic clean exotic and local kush. Best shop ever!!!',
                createdAt: new Date(2021, 3, 23)
            },
            {
                user: {
                    fullName: 'Inigo Lopez',
                },
                rating: 4.5,
                text: 'The best shop to get authentic clean exotic and local kush. Best shop ever!!!',
                createdAt: new Date(2021, 3, 23)
            },
            {
                user: {
                    fullName: 'Inigo Lopez',
                },
                rating: 4.5,
                text: 'The best shop to get authentic clean exotic and local kush. Best shop ever!!!',
                createdAt: new Date(2021, 3, 23)
            },
            {
                user: {
                    fullName: 'Inigo Lopez',
                },
                rating: 4.5,
                text: 'The best shop to get authentic clean exotic and local kush. Best shop ever!!!',
                createdAt: new Date(2021, 3, 23)
            }
        ],
        featuredProducts: [
            {
                _id: 1,
                shop: {
                    name: 'Olympus'
                },
                rating: 4.9,
                owner: {
                    fullName: 'Stanley Hayford'
                },
                price: {
                    amount: 50,
                    currency: 'GHS'
                },
                description: 'Quality high grade imported straight from california',
                strain: 'Indica',
                status: 'Featured',
                image,
                type: 'Euphoria',
                name: 'Indian Hemp California',
                variant: 'weed',
                heritage: 'Foreign'
            },
            {
                _id: 2,
                shop: {
                    name: 'Olympus'
                },
                rating: 4.9,
                owner: {
                    fullName: 'Stanley Hayford'
                },
                price: {
                    amount: 50,
                    currency: 'GHS'
                },
                description: 'Quality high grade imported straight from california',
                strain: 'Indica',
                status: 'Featured',
                image,
                type: 'Euphoria',
                name: 'Indian Hemp California',
                variant: 'weed',
                heritage: 'Foreign'
            },
            {
                _id: 3,
                shop: {
                    name: 'Olympus'
                },
                rating: 4.9,
                owner: {
                    fullName: 'Stanley Hayford'
                },
                price: {
                    amount: 50,
                    currency: 'GHS'
                },
                description: 'Quality high grade imported straight from california',
                strain: 'Indica',
                status: 'Featured',
                image,
                type: 'Euphoria',
                name: 'Indian Hemp California',
                variant: 'weed',
                heritage: 'Foreign'
            },
        ],
        onSaleProducts: [
            {
                _id: 4,
                shop: {
                    name: 'Olympus'
                },
                rating: 4.9,
                owner: {
                    fullName: 'Stanley Hayford'
                },
                price: {
                    amount: 50,
                    currency: 'GHS'
                },
                description: 'Quality high grade imported straight from california',
                strain: 'Indica',
                status: 'Featured',
                image,
                type: 'Euphoria',
                name: 'Indian Hemp California',
                variant: 'weed',
                heritage: 'Foreign'
            },
            {
                _id: 5,
                shop: {
                    name: 'Olympus'
                },
                rating: 4.9,
                owner: {
                    fullName: 'Stanley Hayford'
                },
                price: {
                    amount: 50,
                    currency: 'GHS'
                },
                description: 'Quality high grade imported straight from california',
                strain: 'Indica',
                status: 'Featured',
                image,
                type: 'Euphoria',
                name: 'Indian Hemp California',
                variant: 'weed',
                heritage: 'Foreign'
            },
            {
                _id: 6,
                shop: {
                    name: 'Olympus'
                },
                rating: 4.9,
                owner: {
                    fullName: 'Stanley Hayford'
                },
                price: {
                    amount: 50,
                    currency: 'GHS'
                },
                description: 'Quality high grade imported straight from california',
                strain: 'Indica',
                status: 'Featured',
                image,
                type: 'Euphoria',
                name: 'Indian Hemp California',
                variant: 'weed',
                heritage: 'Foreign'
            },
        ],
    },
    {
        _id: 2,
        owner: {
            fullName: 'Inigo Lopez',
            _id: ''
        },
        contact: {
            phone: '+233270048319'
        },
        name: 'Olympus',
        description: 'We sell the best edibles home prepared for your personal satisfaction',
        status: 'verified',
        rating: {
            average: 5,
            count: 190,
            details: {
                'five': 50,
                'four': 30,
                'three': 10,
                'two': 7,
                'one': 3
            }
        },
        productCount: 9,
        image: olympus
    },
    {
        _id: 3,
        owner: {
            fullName: 'Inigo Lopez',
            _id: ''
        },
        contact: {
            phone: '+233270048319'
        },
        name: 'Olympus',
        description: 'We sell the best edibles home prepared for your personal satisfaction',
        status: 'verified',
        rating: {
            average: 5,
            count: 190,
            details: {
                'five': 50,
                'four': 30,
                'three': 10,
                'two': 7,
                'one': 3
            }
        },
        productCount: 9,
        image: olympus
    },
    {
        _id: 4,
        owner: {
            fullName: 'Inigo Lopez',
            _id: ''
        },
        contact: {
            phone: '+233270048319'
        },
        name: 'Olympus',
        description: 'We sell the best edibles home prepared for your personal satisfaction',
        status: 'verified',
        rating: {
            average: 5,
            count: 190,
            details: {
                'five': 50,
                'four': 30,
                'three': 10,
                'two': 7,
                'one': 3
            }
        },
        productCount: 9,
        image: olympus
    },
    {
        _id: 5,
        owner: {
            fullName: 'Inigo Lopez',
            _id: ''
        },
        contact: {
            phone: '+233270048319'
        },
        name: 'Heliopolis',
        description: 'We sell the best edibles home prepared for your personal satisfaction',
        status: 'verified',
        rating: {
            average: 5,
            count: 190,
            details: {
                'five': 50,
                'four': 30,
                'three': 10,
                'two': 7,
                'one': 3
            }
        },
        productCount: 9,
        image: olympus
    },
    {
        _id: 6,
        owner: {
            fullName: 'Inigo Lopez',
            _id: ''
        },
        contact: {
            phone: '+233270048319'
        },
        name: 'Hades',
        description: 'We sell the best edibles home prepared for your personal satisfaction',
        status: 'verified',
        rating: {
            average: 5,
            count: 190,
            details: {
                'five': 50,
                'four': 30,
                'three': 10,
                'two': 7,
                'one': 3
            }
        },
        productCount: 9,
        image: olympus
    },
]