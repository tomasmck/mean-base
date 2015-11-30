var mongoose = require('mongoose')
    , env = process.env.NODE_ENV || 'development'
    , config = require('../../config/config')[env]
    , Schema = mongoose.Schema;

var GamePoolSchema = new Schema({
    player: { type: Schema.ObjectId, ref: 'User' },
    joinedOn: { type: Date, default: Date.now }
});

GamePoolSchema.statics = {
    load: function (id, cb) {
        this.findOne({ _id: id }).exec(cb);
    }
};

mongoose.model('GamePool', GamePoolSchema);