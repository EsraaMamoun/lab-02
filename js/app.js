'use strict';

$(document).ready(function () {
    function Gallery(horn) {
        this.image_url = horn.image_url;
        this.title = horn.title;
        this.description = horn.description;
        this.keyword = horn.keyword;
        this.horns = horn.horns;
        Gallery.all.push(this);
    }
    Gallery.all = [];
    Gallery.prototype.render = function () {
        let $hornClone = $('#photo-template').clone();

        $hornClone.find('h2').text(this.title);
        $hornClone.find('img').attr('src', this.image_url);
        $hornClone.find('p').text(this.description);

        $hornClone.removeAttr('id');
        // $hornClone.remove();
        $hornClone.attr('id', this.title);
        $hornClone.addClass(this.keyword)
        $('main').append($hornClone);
    }
    const readJson = () => {
        $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' }).then(data => {
            data.forEach(items => {
                let horn = new Gallery(items);
                horn.render();
            });
        }).then(() => selectOption());
    };
    readJson();

    let $hornSelect = $('select');
    const selectOption = function () {
        Gallery.all.forEach(picByKeyword => {
            let $option = `<option value="${picByKeyword.keyword}">${picByKeyword.keyword}<option>`
            $hornSelect.append($option);
        });
    }

    $hornSelect.on('change', function () {
        let $theSelect = $(this).val();
        $('section').hide();
        $(`.${$theSelect}`).show();
    });
});