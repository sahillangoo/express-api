import prisma from '../db';

// get one update
export const getOneUpdate = async (req, res) => {
  const { id } = req.params.id;
  const update = await prisma.update.findFirst({
    where: {
      id,
    },
  });
  res.json({ data: update, message: 'Update retrieved successfully' });
};

// get all updates
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);
  res.json({ data: updates, message: 'Updates retrieved successfully' });
};
// create update
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });
  if (!product) {
    return res.json({ message: 'Product not found' });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: {
        connect: {
          id: product.id,
        },
      },
    },
  });
  res.json({ data: update, message: 'Update created successfully' });
};

// update an update
export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);
  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    return res.json({ message: 'Update not found' });
  }
  const updated = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json({ data: updateUpdate, message: 'Update updated successfully' });
};

// delete an update
export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);
  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    return res.json({ message: 'Update not found' });
  }
  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: deleted, message: 'Update deleted successfully' });
};
