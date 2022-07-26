const prestations = document.querySelectorAll('.el-prestation');

prestations.forEach(prestation => {
    const details = prestation.querySelector(".el-details");
    prestation.addEventListener('mouseenter', (e) => {
        details.classList.add('isactive');
    });
    prestation.addEventListener('mouseleave', (e) => {
        details.style.animationDirection = "reverse"
    });
});

$(document).ready(function() {

    /* $('.el-prestation').find('.el-details').mouseenter(function(){
        $(this).animate({
            bottom: '0'
        })
    }) */

    $('.el-prestation').mouseenter(function(){
        $(this).find('h2 span').css("width", "calc(100% + 1em)")
        $(this).find('.el-details').delay(1000).css("bottom", "0")
    })

    $('.el-prestation').mouseleave(function(){
        $(this).find('h2 span').css("width", "0");
        $(this).find('.el-details').css("bottom", "-82%");
    })

    /* $('.el-prestation').each((index, val)=>{
        $(this).animate({
            bottom: '0'
        })
    }) */
})