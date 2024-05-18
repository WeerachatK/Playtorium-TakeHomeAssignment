// Discount campaigns
export const campaigns = [
    {id: 1,  type: 'amounts', category: 'coupon', discount: 50 },
    {id: 2,  type: 'percentage', category: 'coupon', discount: 10 },
    {id: 3,  type: 'percentage', category: 'onTop', product_category: 'Clothing', discount: 15 },
    {id: 4,  type: 'point', category: 'onTop', customer_points: 68, maxPercentage: 20 },
    {id: 5,  type: 'special', category: 'seasonal', every: 300, discount: 40 },
    // Other campaigns for testing
    // {id: 6,  type: 'amounts', category: 'coupon', discount: 100 },
    // {id: 7,  type: 'percentage', category: 'coupon', discount: 15 },
    // {id: 8,  type: 'percentage', category: 'onTop', product_category: 'Accessories', discount: 10 },
    // {id: 9,  type: 'amounts', category: 'coupon', discount: 20 },
    // {id: 10,  type: 'percentage', category: 'coupon', discount: 25 },
    // {id: 11,  type: 'amounts', category: 'coupon', discount: 80 },
    // {id: 12,  type: 'percentage', category: 'coupon', discount: 12 },
    // {id: 13,  type: 'amounts', category: 'onTop', product_category: 'Clothing', discount: 50 },
];

// Product list
export const products = [
    { id: 1, name: 'T-Shirt', description: 'Normal T-Shirt for customer of all genders and ages.',
    price: 350, category: 'Clothing', img: 'https://static.zara.net/assets/public/ec57/a2f1/ccb1495e896b/d37dd52a384e/01887672800-e1/01887672800-e1.jpg?ts=1703836831480&w=824' },
    { id: 2, name: 'Hat', description: 'Normal hat for customer of all genders and ages.',
    price: 250, category: 'Accessories', img: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/459760/item/goods_56_459760.jpg?width=494' },
    { id: 3, name: 'Hoodie', description: 'Normal hoodie for customer of all genders and ages.',
    price: 700, category: 'Clothing', img: 'https://www.davidgandywellwear.com/cdn/shop/products/Ultimate-Loopback-Hoodie-Black.jpg?v=1677258480'},
    { id: 4, name: 'Watch', description: 'Normal watch for customer of all genders and ages.',
    price: 850, category: 'Accessories', img: 'https://img.ltwebstatic.com/images3_pi/2023/05/19/16844920538b25f40d3140ea1b9564c087801b6223_thumbnail_720x.webp'},
    { id: 5, name: 'Belt', description: 'Normal belt for customer of all genders and ages.',
    price: 230, category: 'Accessories', img: 'https://target.scene7.com/is/image/Target/GUEST_3067230c-cf49-4f7c-ad70-1a59ba79a95a?wid=488&hei=488&fmt=pjpeg'},
    { id: 6, name: 'Bag', description: 'Normal bag for customer of all genders and ages.',
    price: 640, category: 'Accessories', img: 'https://media.takealot.com/covers_images/f88ace07598d431ab4af86b677c21433/s-pdpxl.file' },
];
