const News = require('../model/news');
const Qiniu = require('../../utils/qiniu');

let pub = {};

pub.findAll = async () => {
    let res = await News.findAll();
    return res;
};

pub.findOne = async (filter) => {
    let res = await News.findOne({where: filter});
    return res;
};

pub.create = async (title, writer, content, img) =>{
    let news = await News.create({ title: title, writer: writer, content: content});
    news.setCoverImg(img);
    return news;
};

pub.updateImg = async (news, img) => {
    let oldImg = await news.getCoverImg();
    await Qiniu.deleteFile(oldImg);
    news.setCoverImg(img);
};

pub.update = async (news, title, writer, content) => {
    if(title) news.title = title;
    if(writer) news.writer = writer;
    if(content) news.content = content;
    await news.save();
};

pub.deleteOne = async (filter) => {
    let news = await pub.findOne(filter);
    if (news) {
        let img = await news.getCoverImg();
        await Qiniu.deleteFile(img);
        await news.destroy();
    }
};

module.exports = pub;