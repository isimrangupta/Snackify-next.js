import Link from "next/link";

const Contact = () => {
  return (
    <>
      <div className="px-[8%] lg:px-[12%] bg-[#E6F9EF] py-5">
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
    
    <h2 className="Unbounded text-2xl md:text-3xl">
      Contact!
    </h2>

    <div className="flex flex-wrap items-center text-lg md:text-2xl">
      <Link href="/" className="Unbounded">
        Home&nbsp;:
      </Link>

      <span className="Unbounded text-[var(--prim-color)]">
        &nbsp;Contact!
      </span>
    </div>

  </div>
</div>

        <div className="px-[8%] lg:px-[12%] py-10">
             <div className="flex flex-col lg:flex-row justify-between gap-5">
                {/* Login */}
                <div className="w-full lg:w-1/1 gap-3 border border-gray-300 px-3 py-5 rounded-lg hover:border-[var(--prim-color)] cursor-pointer">
                <h2 className="Unbounded text- mb-10">Make Custom Request</h2>
                 <form>
              <div className="flex flex-col mb-5">
                <label className="Unbounded mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="rounded-md border border-gray-300 focus-outline-none focus:border-[var(--prim-color)] h-[40px] pl-2"
                  
                />
              </div>

              <div className="flex flex-col mb-5">
                <label className="Unbounded mb-2">Phone Number</label>
                <input
                  type="number"
                  placeholder="Number"
                  className="rounded-md border border-gray-300 focus-outline-none focus:border-[var(--prim-color)] h-[40px] pl-2"
                  name=""
                  id=""
                />
              </div>

              <div className="flex flex-col mb-5">
                <label className="Unbounded mb-2">Message</label>
                <input
                  type="text"
                  placeholder="type your Message"
                  className="rounded-md border border-gray-300 focus-outline-none focus:border-[var(--prim-color)] h-[40px] pl-2"
                />
              </div>
              
              <div className="flex items-center gap-5 mb-8">
                <button className="px-8 py-3 rounded-md text-white Unbounded text-white bg-[var(--prim-color)]">
                    Send Message
                </button>


              </div>
            </form>
                </div>
             </div>
        </div>

        
      
    </>
  )
}

export default Contact
