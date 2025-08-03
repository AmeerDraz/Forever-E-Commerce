import React from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal';

const PlaceOrder = () => {
  return (
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
          {/* ------- Ledt Side ----- */}
          <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
              <div className="text-xl sm:text-2xl my-3">
                  <Title text1={"DELIVERY"} text2={"INFORMATIONN"} />
              </div>
              <div className="flex gap-3 ">
                  <input
                      className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                      type="text"
                      placeholder="First Name"
                  />
                  <input
                      className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                      type="text"
                      placeholder="Last Name"
                  />
              </div>
              <input
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                  type="email"
                  placeholder="Email adderess"
              />
              <input
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                  type="text"
                  placeholder="Street"
              />
              <div className="flex gap-3 ">
                  <input
                      className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                      type="text"
                      placeholder="City"
                  />
                  <input
                      className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                      type="text"
                      placeholder="State"
                  />
              </div>
              <div className="flex gap-3 ">
                  <input
                      className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                      type="number"
                      placeholder="Zip Code"
                  />
                  <input
                      className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                      type="text"
                      placeholder="Country"
                  />
              </div>
              <input
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                  type="number"
                  placeholder="Phone"
              />
      </div>
      {/*------- Right Side ----------  */}

      <div className='mt-8'>
        <div className='mt-8 min-w-80 '>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* ------------ Payment Method Selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p></p>

            </div>
          </div>
        </div>
      </div>
      </div>
  );
}

export default PlaceOrder