const Conversation = require('../../Model/Chat/salleDiscussion');


exports.createNewConversations = async (req, res) => {
  try {
    const { members } = req.body;

    // if (!members || !Array.isArray(members) || members.length < 2) {
    //   return res.status(400).json({ message: "La requête doit contenir au moins deux membres de la conversation." });
    // }
  
    // Vérifiez si une conversation avec les mêmes membres existe déjà
    const existingConversation = await Conversation.findOne({ members: { $all: members } });
    if (existingConversation) {
      return res.status(409).json({ message: "Une conversation avec ces membres existe déjà." });
    }

    // Créer une nouvelle conversation car aucun doublon de membres n'a été trouvé
    const newConversation = await Conversation.create({ members });
    res.status(201).json(newConversation);
      
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getConversationsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userRole = req.params.userRole;
console.log(userId)
console.log(userRole)
    //let conversations;
    if (userRole === "Admin") {
      // Si l'utilisateur est un administrateur, récupérez toutes les conversations
     const  conversations = await Conversation.find();
      res.status(200).json(conversations);
    } else {
      // Sinon, récupérez les conversations spécifiques de l'utilisateur
     const  conversation = await Conversation.find({ "members._id": userId });
      res.status(200).json(conversation);
      //console.log(conversation)
    }

    //res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
