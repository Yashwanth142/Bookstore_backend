import Customer from '../models/customer.model';

export const addCustomerDetails = async (body) => {
  let customer = await Customer.findOne({ userId: body.userId });
  //console.log('customer services--------->', customer);

  if (!customer) {
    customer = await Customer.create({
      userId: body.userId,
      address: [
        {
          fullName: body.fullName,
          phoneNumber: body.phoneNumber,
          addressType: body.addressType,
          address: body.address,
          city: body.city,
          state: body.state
        }
      ]
    });
    return customer;
  }

  let updateCustomer;
  //console.log('body',customer.userId)
  if (customer.userId==body.userId) { 
    const updateExistingAddress = {};
    updateExistingAddress[`address.${0}.fullName`] = body.fullName;
    updateExistingAddress[`address.${0}.phoneNumber`] = body.phoneNumber;
    updateExistingAddress[`address.${0}.addressType`] = body.addressType;
    updateExistingAddress[`address.${0}.address`] = body.address;
    updateExistingAddress[`address.${0}.city`] = body.city;
    updateExistingAddress[`address.${0}.state`] = body.state;

    updateCustomer = await Customer.updateOne(
      { _id: customer._id },
      {
        $set: updateExistingAddress
      }
    );
  }
  return updateCustomer;
};