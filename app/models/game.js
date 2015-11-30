var mongoose = require('mongoose')
    , env = process.env.NODE_ENV || 'development'
    , config = require('../../config/config')[env]
    , Schema = mongoose.Schema;

var GameSchema = new Schema({
    playerOne: { type: Schema.ObjectId, ref: 'User' },
    playerTwo: { type: Schema.ObjectId, ref: 'User' },
    createdOn: { type: Date },
    inProgress: { type: Boolean },
    completed: { type: Boolean },
    completedOn: { type: Date },

    messages: [{
        to: { type: Schema.ObjectId, ref: 'User' },
        from: { type: Schema.ObjectId, ref: 'User' },
        message: { type: String },
        datetime: { type: Date, default: Date.now }
    }]
});

GameSchema.statics = {
    load: function (id, cb) {
        this.findOne({ _id: id }).exec(cb);
    }
};

mongoose.model('Game', GameSchema);