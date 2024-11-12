import React from "react";

const CustomerSupport = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-4xl bg-yellow-50 rounded-lg p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/3 mb-8 md:mb-0 flex flex-col items-center">
            <div className="text-center space-y-4">
              <div className="flex flex-col items-center">
                <i className="fas fa-map-marker-alt text-3xl text-[#3e2093] mb-2"></i>
                <div className="font-semibold text-lg">Address</div>
                <p className="text-gray-500 text-sm">Surkhet, NP12</p>
                <p className="text-gray-500 text-sm">Birendranagar 06</p>
              </div>
              <div className="flex flex-col items-center">
                <i className="fas fa-phone-alt text-3xl text-[#3e2093] mb-2"></i>
                <div className="font-semibold text-lg">Phone</div>
                <p className="text-gray-500 text-sm">+0098 9893 5647</p>
                <p className="text-gray-500 text-sm">+0096 3434 5678</p>
              </div>
              <div className="flex flex-col items-center">
                <i className="fas fa-envelope text-3xl text-[#3e2093] mb-2"></i>
                <div className="font-semibold text-lg">Email</div>
                <p className="text-gray-500 text-sm">codinglab@gmail.com</p>
                <p className="text-gray-500 text-sm">
                  info.codinglab@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-2/3 md:ml-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-[#3e2093]">
                Send us a message
              </h2>
              <p className="text-gray-600 mt-2">
                If you have any work or queries related to my tutorial, you can
                send me a message from here. I’m happy to help you!
              </p>
            </div>

            <form action="#" className="space-y-4">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full h-12 px-4 rounded-lg bg-gray-100 text-gray-800 outline-none focus:ring-2 focus:ring-[#3e2093]"
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-full h-12 px-4 rounded-lg bg-gray-100 text-gray-800 outline-none focus:ring-2 focus:ring-[#3e2093]"
                />
              </div>
              <div className="w-full">
                <textarea
                  placeholder="Enter your message"
                  className="w-full h-28 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 outline-none focus:ring-2 focus:ring-[#3e2093] resize-none"></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 text-white bg-[#3e2093] rounded-lg font-semibold hover:bg-[#5029bc] transition duration-300">
                  Send Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
