"use client";

import Image from "next/image";

import toast from "react-hot-toast";

interface ProductType {
  Id: string;
  image: string;
  title: string;
  price: string;
  lessprice: string;
  review: string;
  sold?: string;
  sale?: string;
}

interface Props {
  id?: string;
  products: ProductType[];
}

const ProductDetails = ({ id, products }: Props) => {
  if (!id) {
    return (
      <div>
        <h1>All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.Id} className="border p-4 rounded-md">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <h2 className="font-bold mt-2">{product.title}</h2>
              <p className="text-green-600">{product.price}</p>
              {product.lessprice && (
                <p className="line-through text-gray-500">{product.price}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const product = products.find((item) => String(item.Id) === String(id));

  if (!product) return <p>Product Not Found!</p>;

  const realtedProducts = products.filter((item) => item.Id !== product.Id);

  const handleAddToCart = (product: any) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProduct = cart.find((item: any) => item.Id === product.Id);

    if (existingProduct) {
      toast(`${product.title} is already in the cart`, {
        icon: "⚠️",
        style: {
          border: "1px solid #facc15",
          padding: "16px",
          color: "#333",
          background: "#fff9c4",
        },
      });
    } else {
      cart.push({ ...product, qty: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storageUpdate"));

      toast.success(`${product.title} added to cart!`);
    }
  };

  const handleAddToWishlist = (product: any) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const existingProduct = wishlist.find(
      (item: any) => item.Id == product.Id
    );

    if (existingProduct) {
      toast(`${product.title} is already in the wishlist`, {
        icon: "⚠️",
        style: {
          border: "1px solid #facc15",
          padding: "16px",
          color: "#333",
          background: "#fff9c4",
        },
      });
    } else {
      wishlist.push({ ...product, qty: 1 });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("storageUpdate"));

      toast.success(`${product.title} added to wishlist!`);
    }
  };

  return (
    <>
      <div className="px-[8%] lg:px-[12%] py-10">
        <div className="flex justify-between gap-5">
          <div className="w-full lg:w-1/1 flex flex-col lg:flex-row md:flex-row  sticky top-2/12 left-0 h-fit justify-between">
            <div className="border border-gray-300  mb-4 lg:mb-0  rounded-lg p-4 bg-white shadow-sm hover:shadow-xl transition-all hover:border-[var(--prim-color)] cursor-pointer duration-300">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className="object-contain p-20"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col">
              <h2 className="Unbounded text-2xl font-semibold text-gray-700">{product.title}</h2>
              <span className="flex items-center border-b border-gray-300 pb-3 text-yellow-500 text-md mt-4">
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                &nbsp;
                <span className=" font-medium text-gray-700">
                  4.5 star Rating{product.review}
                </span>
              </span>
              <p className="my-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, dolores!
              </p>
              <div className="flex items-center gap-2 border-b border-gray-300 pb-3">
                <h3 className="Unbounded text-2xl text-pink-900">{product.price}</h3>
                <del className="Unbounded text-gray-500">
                  {product.lessprice}
                </del>
              </div>
              <span className="my-3 bg-[#6b320771] px-2 py-3 rounded-md text-white">
                Special Offer: <strong> 5 Days </strong> Remains untill the end
                of the offer
              </span>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 px-4 font-semibold text-white bg-[#789a9e] rounded-md text-md hover:bg-[#2b5960] hover:text-white cursor-pointer transition w-full h-10"
              >
                Add To Cart <i className="bi bi-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
