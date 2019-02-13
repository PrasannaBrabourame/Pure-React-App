const checkout = (req, res) => {
    const objInput = req.body;
    let totalPrice = 0;
    let classicQty;
    let standoutQty;
    let premiumQty;
    let costperCustomer = {
        unilever: {
            classicQty: 269.99,
            standoutQty: 322.99,
            premiumQty: 394.99,
        }, apple: {
            classicQty: 269.99,
            standoutQty: 299.99,
            premiumQty: 394.99,
        }, ford: {
            classicQty: 269.99,
            standoutQty: 322.99,
            premiumQty: 394.99,
            premiumDisCount :389.99
        }, default: {
            classicQty: 269.99,
            standoutQty: 322.99,
            premiumQty: 394.99,
            
        }
    }
    switch (objInput.customer) {
        case 'unilever':
            classicQty = objInput.items.filter(item => item === 'classic').length;
            standoutQty = objInput.items.filter(item => item === 'standout').length;
            premiumQty = objInput.items.filter(item => item === 'premium').length;
            if (classicQty >= 3) {
                classicQty -= 1;
            }
            totalPrice = costperCustomer.unilever.classicQty * classicQty + costperCustomer.unilever.standoutQty * standoutQty + costperCustomer.unilever.premiumQty * premiumQty;
            break;
        case 'apple':
            classicQty = objInput.items.filter(item => item === 'classic').length;
            standoutQty = objInput.items.filter(item => item === 'standout').length;
            premiumQty = objInput.items.filter(item => item === 'premium').length;
            totalPrice = costperCustomer.apple.classicQty * classicQty + (costperCustomer.apple.standoutQty * (standoutQty)) + costperCustomer.apple.premiumQty * premiumQty;
            break;
        case 'ford':
            classicQty = objInput.items.filter(item => item === 'classic').length;
            standoutQty = objInput.items.filter(item => item === 'standout').length;
            premiumQty = objInput.items.filter(item => item === 'premium').length;
            //totalPrice = classicQty > 4 ? (Math.trunc(classicQty / 5) + Math.trunc(classicQty % 5)) * 4 * 269.99 : classicQty * 269 + standoutQty * 322.99 + premiumQty > 2 ? (premiumQty * (394.99 - 389.99)) : premiumQty * (394.99);
            if (classicQty >= 5) {
                classicQty -= 1;
            }
            totalPrice = costperCustomer.ford.classicQty * classicQty + costperCustomer.ford.standoutQty * standoutQty + (premiumQty > 2 ? premiumQty * costperCustomer.ford.premiumDisCount : premiumQty * (costperCustomer.ford.premiumQty));
            break;
        default:
            classicQty = objInput.items.filter(item => item === 'classic').length;
            standoutQty = objInput.items.filter(item => item === 'standout').length;
            premiumQty = objInput.items.filter(item => item === 'premium').length;
            totalPrice = classicQty * costperCustomer.default.classicQty + standoutQty * costperCustomer.default.standoutQty + premiumQty * costperCustomer.default.premiumQty;
            break;
    }

    res.status(200).send({ total: totalPrice });
    return totalPrice.toFixed(2);
};
export default checkout;
