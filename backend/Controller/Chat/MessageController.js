const Message = require('../../Model/Chat/Message');

// Envoyer un nouveau message
exports.sendMessage = async (req, res) => {
  const { conversationId, sender,receipt, text } = req.body;

  try {
    const newMessage = new Message({ conversationId, sender,receipt, text });
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Obtenir les messages d'une conversation
exports.getMessages = async (req, res) => {
  const { conversationId, senderId, receiptId } = req.params;
  try {
    const messages = await Message.find({
      conversationId: conversationId,
      $or: [{ sender: senderId }, { receipt: receiptId }],
    }).populate('sender', 'nom image').populate('receipt', 'nom image');
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};


// exports.getMessages = async (req, res) => {
//   const conversationId = req.params.conversationId;
//   try {
//     const messages = await Message.find({ conversationId: conversationId });
//     res.status(200).json(messages);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
// Endpoint pour récupérer les messages entre deux utilisateurs
exports.getMessagesByUser = async (req, res) => {
  try {
    const { userId } = req.params; // Supposons que userId est l'identifiant de l'utilisateur spécifié

    // Récupérer les messages envoyés par l'utilisateur spécifié
    const messages = await Message.find({ sender: userId });

    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: "Aucun message trouvé pour cet utilisateur." });
    }

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
