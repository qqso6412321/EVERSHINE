function initModuleImageTextGiant(moduleId, layout,linenum) {
    if ($.inArray(Number(layout), [112,103,105,106,108,107,109,104,102,111,118])>-1) {
        if ($.inArray(Number(layout), [104])>-1) {
            isIE(moduleId);
        }

        var ImageSizechange = function () {
            if ($(window).width() < 786) {
                if(layout == 109) {
                   var lgCount = $('#module_' + moduleId).find('.normal_ImgtextBox').attr('lgCount');
                    $('#module_' + moduleId).find('.normal_ImgtextBox').removeClass('col-lg-'+lgCount);
                }
                if(linenum == '2'){
                    $('#module_' + moduleId).find('.normal_ImgtextBox,.normal_ImgtextBox_contentitem,.normal_ImgtextBox_content').addClass('MobileImgtextBox')
                }
                if($.inArray(Number(layout),[105,106,104,111,118]) >-1) {
                    $('#module_' + moduleId + ' .imageTextContainer .GraphicUpper').addClass('MobileGraphicUpper')
                }else{
                   $('#module_' + moduleId + ' .imageTextContainer .GraphicUpper .TextImage').addClass('MobileTextImage')
                }
                $('#module_' + moduleId + ' .imageTextContainer .ModuleImageTextContent').addClass('ModuleMobileImageTextContent')
            } else {
                if(layout == 109) {
                    var lgCount = $('#module_' + moduleId).find('.normal_ImgtextBox').attr('lgCount');
                     $('#module_' + moduleId).find('.normal_ImgtextBox').addClass('col-lg-'+lgCount);
                 }
                if(linenum == '2'){
                    $('#module_' + moduleId).find('.normal_ImgtextBox,.normal_ImgtextBox_contentitem,.normal_ImgtextBox_content').removeClass('MobileImgtextBox')
                }
                if($.inArray(Number(layout),[105,106,104,111,118])>-1){
                    $('#module_' + moduleId + ' .imageTextContainer .GraphicUpper').removeClass('MobileGraphicUpper')
                }else{
                   $('#module_' + moduleId + ' .imageTextContainer .GraphicUpper .TextImage').removeClass('MobileTextImage')
                }
                $('#module_' + moduleId + ' .imageTextContainer .ModuleImageTextContent').removeClass('ModuleMobileImageTextContent')
            }
        }
        ImageSizechange();
        $(window).on('resize', function () {
            ImageSizechange();
        });
    }else{
        // ?????? layout???????????????????????????
        this['layout' + layout].call(this, moduleId, layout);
    }
      $('#module_'+moduleId+' >.module_'+moduleId).css('cssText','-webkit-transform:translate3d(0,0,0)')
}

function layout106(moduleId, layout) {
    var windowchange = function () {
        var obj = $('#module_' + moduleId).find('.normal_ImgtextBox_content');
        var num = obj.length;
        if (num > 2) {
            for (var i = 0; i < num; i++) {
                if (i % 2 != 0 && window.innerWidth > 768) {
                    if (obj.eq(i).height() > obj.eq(i - 1).height()) {
                        obj.eq(i).css('height', obj.eq(i).height());
                        obj.eq(i - 1).css('height', obj.eq(i).height());
                    } else if (obj.eq(i).height() < obj.eq(i - 1).height()) {
                        obj.eq(i).css('height', obj.eq(i - 1).height());
                        obj.eq(i - 1).css('height', obj.eq(i - 1).height());
                    }
                } else {
                    obj.eq(i).css('height', 'auto');
                }
            }
        }
    }

    var imgNum = $('#module_' + moduleId + ' .imageTextContainer .GraphicUpper .TextImage').length;
    $('#module_' + moduleId + ' .imageTextContainer .GraphicUpper .TextImage').load(function () {
        if (!--imgNum) {
            // ????????????????????????
            windowchange();
        }
    });

    $(window).on('resize', function () {
        windowchange();
    });
}
// layout-101 ??????????????????
function layout116(moduleId, layout) {
    // ????????? dom
    var accordionDom = $('#module_' + moduleId + ' .accordion-giant-main  .axxrdion-list-item');
    // ????????????????????????????????????
    if (accordionDom.length >= 1) {
        accordionDom.eq(0).addClass('active');
        calcWidth('', moduleId, layout);
    }

    // ????????????????????????
    var accordionTimer
    accordionDom.on('mouseenter.accordionDom', function (event) {
        var self = $(this);
        // ????????????????????????
        var animationDelay = 100;
        accordionTimer = setTimeout(function () {
            // ??????????????????????????????????????????????????? li ???????????????
            self.addClass('active').siblings('li').removeClass('active');
            calcWidth(event.currentTarget, moduleId, layout);
            // ???????????? default-view ????????? hover-view ???????????? fadeIn ?????????????????????????????????????????????
            self.children('.default-view').stop(true).hide().siblings('.hover-view').delay(animationDelay).fadeIn();
            // ????????????
            accordionDom.not('.active').children('.default-view').delay(animationDelay).fadeIn().siblings('.hover-view').stop(true).hide();
        }, 80)
    }).on('mouseleave.accordionDom', function (event) {
        clearTimeout(accordionTimer)
    })
}

function calcWidth(targetDom, moduleId, layout) {
    // ????????? dom
    // ?????????swiper(???????????????)???loop???????????????????????????slide????????????????????????????????????????????????accordionDom???dom?????????????????????,??????????????????????????????bug
    var accordionDom
    if (targetDom !== '') {
        accordionDom = $(targetDom).closest('#module_' + moduleId).find('.accordion-giant-main  .axxrdion-list-item')
    } else {
        accordionDom = $('#module_' + moduleId).find('.accordion-giant-main  .axxrdion-list-item')
    }
    // ?????????????????????
    accordionDom.each(function () {
        var calc = 70;
        var activeCalc = 30;
        switch (accordionDom.length) {
            case 2:
                calc = 40;
                activeCalc = 60;
                break;
            case 3:
                calc = 60;
                activeCalc = 40;
                break;
            case 4:
                calc = 65;
                activeCalc = 35;
                break;
        }
        if ($(this).hasClass('active')) {
            // ?????????
            $(this).css('width', activeCalc + '%')
        } else {
            // ?????????
            var calcWidth = calc / (accordionDom.length - 1);
            $(this).css('width', calcWidth + '%')
        }
    })
}

/**IE?????? */
function isIE(moduleId) {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        //????????????
        var itemWidth = $('#module_' + moduleId + ' .normal_ImgtextBox_content');

        itemWidth.width( itemWidth.width() - 0.5 );
    }
}
