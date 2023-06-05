//jQuery实现轮播效果
//mainCell: ".bd ul"：指定了包含幻灯片内容的元素选择器。
jQuery(".banner").slide({ mainCell: ".bd ul", autoPlay: true, interTime: 5000 });

jQuery("#ifocus").slide({ titCell: "#ifocus_btn li", mainCell: "#ifocus_piclist ul", effect: "leftLoop", delayTime: 200, autoPlay: true, triggerTime: 0 });

jQuery("#ifocus").slide({ titCell: "#ifocus_btn li", mainCell: "#ifocus_tx ul", delayTime: 0, autoPlay: true });

jQuery(".product_list").slide({ mainCell: ".bd ul", autoPage: true, effect: "leftLoop", autoPlay: true, vis: 5, trigger: "click", interTime: 4000 });