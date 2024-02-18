import prisma from '../db';

// Get all products
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });
  res.json({ data: user.products, message: 'Products retrieved successfully' });
};

// Get one product
export const getOneProduct = async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsTo: {
        id: req.user.id,
      },
    },
  });
  res.json({ data: product, message: 'Product retrieved successfully' });
};

// Create one
export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: product, message: 'Product created successfully' });
};

// update a product
export const updateProduct = async (req, res) => {
  const { name } = req.body.name;
  const updated = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name,
    },
  });
  res.json({ data: updated, message: 'Product updated successfully' });
};

// delete a product
export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });
  res.json({ data: deleted, message: 'Product deleted successfully' });
};
