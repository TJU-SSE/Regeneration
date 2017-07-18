let pub = {};

pub.createNews = function (id, title, writer, content, time, viewcount, img_id, img_url, tags) {
    return {
        id: id,
        title: title,
        writer: writer,
        content: content,
        time: time,
        viewcount: viewcount,
        img_id: img_id,
        img_url: img_url,
        tag: tags
    };
};

pub.createNewses = function (id, title, writer, time, img_id, img_url, tags) {
    return {
        newsId: id,
        title: title,
        writer: writer,
        time: time,
        cover_img: img_url,
        tag: tags
    }
};

module.exports = pub;
