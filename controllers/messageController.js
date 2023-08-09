const Message = require('../model/message');

const handlePostMessage = async (req, res) => {
  try {
    const { orderID, from, to, quantity, pickupAddress, transporter } =
      req.body;
    const newMessage = new Message({
      orderID,
      from,
      to,
      quantity,
      pickupAddress,
      transporter,
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
const handleGetALLMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
module.exports = { handlePostMessage, handleGetALLMessages };
