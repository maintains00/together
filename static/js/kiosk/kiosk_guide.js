function page_default(){
    document.getElementById("explain_box_1").style.display = 'none';
    document.getElementById("explain_box_2").style.display = 'none';
    document.getElementById("explain_box_3").style.display = 'none';
    document.getElementById("explain_box_4").style.display = 'none';
    document.getElementById("explain_box_5").style.display = 'none';
    document.getElementById("step_1").style.display = 'none';
    document.getElementById("step_2").style.display = 'none';
    document.getElementById("step_3").style.display = 'none';
    document.getElementById("step_4").style.display = 'none';
    document.getElementById("step_5").style.display = 'none';

    document.getElementById("dis_step").style.display = 'none';
    document.getElementById("dis_start").style.display = 'flex';
}

function dis_start_fade(){
    document.getElementById("dis_start").style.display = 'none';
    document.getElementById("dis_step").style.display = 'flex';
}

function dis_step_fade(){
    document.getElementById("dis_step").style.display = 'none';
    document.getElementById("explain_box_1").style.display = 'flex';
    document.getElementById("step_1").style.display = 'flex';
}


function next_text_1(){
    document.getElementById("explain_box_1").style.display = 'none';
    document.getElementById("step_1").style.display = 'none';
    document.getElementById("explain_box_2").style.display = 'flex';
    document.getElementById("step_2").style.display = 'flex';
}
function next_text_2(){
    document.getElementById("explain_box_2").style.display = 'none';
    document.getElementById("step_2").style.display = 'none';
    document.getElementById("explain_box_3").style.display = 'flex';
    document.getElementById("step_3").style.display = 'flex';
}
function next_text_3(){
    document.getElementById("explain_box_3").style.display = 'none';
    document.getElementById("step_3").style.display = 'none';
    document.getElementById("explain_box_4").style.display = 'flex';
    document.getElementById("step_4").style.display = 'flex';
}
function next_text_4(){
    document.getElementById("explain_box_4").style.display = 'none';
    document.getElementById("step_4").style.display = 'none';
    document.getElementById("explain_box_5").style.display = 'flex';
    document.getElementById("step_5").style.display = 'flex';
}
function replay(){
    document.getElementById("explain_box_5").style.display = 'none';
    document.getElementById("step_5").style.display = 'none';
    document.getElementById("dis_start").style.display = 'flex';
}