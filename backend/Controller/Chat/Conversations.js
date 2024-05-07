const Conversation = require('../../Model/Chat/Conversation');
exports.createNewConversations = async (req, res) => {
    try {
      const senderId = req.body.senderId;
      const receiverId = req.body.receiverId;
  
    //   // Vérifiez si une conversation avec les mêmes membres existe déjà
    //   const existingConversation = await Conversation.findOne({ members: { $all: [senderId, receiverId] } });
    //   if (existingConversation) {
    //     return res.status(409).json({ message: "Une conversation avec ces membres existe déjà." });
    //   }
  
      // Créer une nouvelle conversation
      const newConversation = new Conversation({
        members: [senderId, receiverId]
      });
  
      const savedConversation = await newConversation.save();
      res.status(201).json(savedConversation);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
exports.getConversationsByUserId = async (req, res) => {
    try {
        const conversation = await Conversation.find({
          members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
      } catch (err) {
        res.status(500).json(err);
      }
};
// exports.getConversationsByUserId = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const userRole = req.params.userRole;
//     console.log("role",userRole)
//     console.log("userId",userId)
//     if (userRole === "Admin") {
//       const conversation = await Conversation.find();
//       return res.status(200).json(conversation);
//     }else {
//       const conversations = await Conversation.findOne({"members._id": userId });
//       res.status(200).json(conversations);
//     }
  
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.getConversationByUserIds = async (req, res) => {
  try {
    const firstUserId = req.params.firstUserId;
    const secondUserId = req.params.secondUserId;

    const conversation = await Conversation.findOne({
      $and: [
        { "members._id": firstUserId },
        { "members._id": secondUserId }
      ]
    });

    if (!conversation) {
      return res.status(404).json({ message: 'Aucune conversation trouvée entre ces utilisateurs' });
    }

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
