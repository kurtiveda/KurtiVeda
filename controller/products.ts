import { auth } from "@/auth";
import { prisma } from "@/prisma/index";
import { CartProduct } from "@/types";

export async function createCart(userId: string, products: CartProduct) {
  try {
    const resp = await prisma.carts.create({
      data: {
        userId: userId,
        cart: {
          status: "IN_CART",
          products: {
            id: products.id,
            name: products.name,
            price: products.price,
            Quantity: products.Quantity,
            size: products.size,
          },
        },
      },
    });

    if (resp) return resp.cart;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  } finally {
  }
}

export async function checkCartExists(userId: string) {
  try {
    const resp = await prisma.carts.findUnique({
      where: { userId: userId },
      select: {
        cart: true,
      },
    });
    console.log("isCartExists", resp);
    if (resp) return true;
    return false;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  } finally {
  }
}

export async function addProduct(userId: string, products: CartProduct) {
  try {
    const existingCart = await prisma.carts.findUnique({
      where: {
        userId: userId,
        cart: {
          some: {
            status: "IN_CART",
          },
        },
      },
      select: {
        cart: true,
      },
    });

    if (!existingCart) {
      throw new Error("Cart not found");
    }

    // Find the index of the cart with status "IN_CART"
    const cartIndex = existingCart.cart.findIndex(
      (cart) => cart.status === "IN_CART"
    );

    // Find the index of the product in the existing cart
    const existingProductIndex = existingCart.cart[
      cartIndex
    ].products.findIndex(
      (product) => product.id === products.id && product.size === products.size
    );

    if (existingProductIndex >= 0) {
      // If the product already exists, update its quantity
      existingCart.cart[cartIndex].products[existingProductIndex].Quantity +=
        products.Quantity;
    } else {
      // Otherwise, add the new product to the cart
      existingCart.cart[cartIndex].products.push({
        id: products.id,
        name: products.name,
        price: products.price,
        Quantity: products.Quantity,
        size: products.size,
      });
    }
    const updatedCart = await prisma.carts.update({
      where: {
        userId: userId,
      },
      data: {
        cart: {
          set: existingCart.cart, // Set the entire updated cart array
        },
      },
      select: {
        cart: true,
      },
    });

    return updatedCart.cart;
  } catch (err) {
    console.log(err);
    return false;
  } finally {
  }
}

export async function getProducts(userId: string) {
  try {
    // console.log("userId", userId);

    const products = await prisma.carts.findMany({
      where: {
        userId: userId,
        cart: {
          some: {
            status: "IN_CART",
          },
        },
      },
      select: {
        cart: true,
      },
    });
    console.log("products===", products);
    const [filteredProducts] = products.map((prod) => {
      return prod.cart.filter((c) => c.status === "IN_CART");
    });

    console.log("filterproducts===", filteredProducts);
    return filteredProducts;
  } catch (err) {
    console.log(err);
  } finally {
  }
}

export async function getAddresses(userId: string) {
  try {
    const addresses = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        address: true,
      },
    });
    return addresses?.address;
  } catch (err) {
  } finally {
  }
}

export async function setStatus(userId: string, Tr_id: string) {
  const res = await prisma.carts.update({
    where: {
      userId: userId,
    },
    data: {
      cart: {
        updateMany: {
          where: {
            status: "IN_CART",
          },
          data: {
            status: "PAID",
            Tr_id: Tr_id,
            payment_date: new Date(),
          },
        },
      },
    },
  });
  return res;
}
export async function checkOrderExists(userId: string) {
  try {
    const isOrdersExist = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
    });

    console.log("isOrdersExist===", isOrdersExist);

    if (isOrdersExist.length > 0) {
      return true;
    }
    return false;
  } catch (err) {
    console.log("Error", err);
  }
}
export async function addOrders(userId: string) {
  try {
    const products = await prisma.carts.findMany({
      where: {
        userId: userId,
        cart: {
          some: {
            status: "PAID",
          },
        },
      },
      select: {
        cart: true,
      },
    });
    console.log("products===", products);
    const [filteredProducts] = products.map((prod) => {
      return prod.cart.filter((c) => c.status === "PAID");
    });
    console.log("filteredproducts===", filteredProducts);

    const orderExist = await checkOrderExists(userId);

    if (orderExist === true) {
      const orders = await prisma.orders.update({
        where: {
          userId: userId,
        },
        data: {
          orders: {
            push: filteredProducts,
          },
        },
      });
      console.log("orders", orders);
    } else {
      const orders = await prisma.orders.create({
        data: {
          userId: userId,
          orders: filteredProducts,
        },
      });

      console.log("orders", orders);
    }

    const updatedCart = await prisma.carts.updateMany({
      where: {
        userId: userId,
      },
      data: {
        cart: [],
      },
    });

    console.log("updatedCart===", updatedCart);
  } catch (err) {
    console.log(err);
  } finally {
  }
}

export async function removeProductById(
  productId: string,
  userId: string,
  size: string
) {
  try {
    const products = await prisma.carts.findMany({
      where: {
        userId: userId,
        cart: {
          some: {
            status: "IN_CART",
          },
        },
      },
      select: {
        cart: true,
      },
    });
    console.log("products===", products);
    const [filteredProducts] = products.map((prod) => {
      return prod.cart.filter((c) => c.status === "IN_CART");
    });
    console.log("filteredproducts===", filteredProducts);

    const removedProducts = filteredProducts[0].products.filter(
      (p) => p.id !== productId || p.size !== size
    );

    console.log("size===", size);

    console.log("removedProducts===", removedProducts);

    const updatedCart = await prisma.carts.update({
      where: {
        userId: userId,
      },
      data: {
        cart: {
          updateMany: {
            where: {
              status: "IN_CART",
            },
            data: {
              products: removedProducts,
            },
          },
        },
      },
      select: {
        cart: true,
      },
    });

    const [filteredUpdatedProducts] = updatedCart.cart.filter(
      (c) => c.status === "IN_CART"
    );
    console.log("updatedCart === ", filteredUpdatedProducts);
    return updatedCart;
  } catch (err) {
    console.log(err);
  } finally {
  }
}
