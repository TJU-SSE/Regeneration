const NewsRepository = require('../orm/repository/newsRepository');
const NewsViewModel = require('../view_model/news');
const Qiniu = require('../utils/qiniu');

let pub = {};

pub.findOne = async (filter) => {
    return await NewsRepository.findOne(filter);
};

pub.findAll = async () => {
    return await NewsRepository.findAll();
};

pub.create = async (key, localFile, title, writer, content, time) => {
    try {
        await Qiniu.uploadFile(key, localFile, async function (img) {
                await NewsRepository.create(title, writer, content, time, img);
        });
        return 'success';
    } catch (e) {
        return e;
    }
};

pub.updateImg = async (news, key, localFile) => {
    try {
        await Qiniu.uploadFile(key, localFile, async function (img) {
            await NewsRepository.updateImg(news, img);
        });
        return 'success';
    } catch (e) {
        return e;
    }
};

pub.update = async (news, title, writer, content, time) => {
    try {
        await NewsRepository.update(news, title, writer, content, time);
        return 'success';
    } catch (e) {
        return e;
    }
};

pub.delete = async (filter) => {
    try {
        await NewsRepository.deleteOne(filter);
        return 'success';
    } catch (e) {
        return e;
    }
};

pub.createNewsViewModel = async (news) => {
    try {
        let id = news.get('id');
        let title = news.get('title');
        let writer = news.get('writer');
        let content = news.get('content');
        let time = news.get('time');
        let viewcount = news.get('viewcount');
        let img = await news.getCoverImg();
        let img_id = img.get('id');
        let img_url = img.get('url');
        return NewsViewModel.createNews(id, title, writer, content, time, viewcount, img_id, img_url);
    } catch (e) {
        return e;
    }
};

pub.createNewsesViewModel = async (newses) => {
    try {
        let ret = [];
        for (let x in newses) {
            let news = newses[x];
            let id = news.get('id');
            let title = news.get('title');
            let writer = news.get('writer');
            let time = news.get('time');
            let img = await news.getCoverImg();
            let img_id = img.get('id');
            let img_url = img.get('url');
            ret.push(NewsViewModel.createNewses(id, title, writer, time, img_id, img_url))
        }
        return ret.sort((a, b) => {
            return a.time - b.time;
        });
    } catch (e) {
        return e;
    }
};

module.exports = pub;
