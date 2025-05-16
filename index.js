const container = document.querySelector("#container");
const instruction = document.querySelector("#instruction");

const numColsRows = 64;

const rainbow = ['#e81416', '#ffa500', '#faeb36', '#79c314', '#487de7', '#4b369d', '#70369d'];
let index = rainbow.length;
let opacityUp = true;

function createDiv(row)
{
    const div = document.createElement("div");
    div.setAttribute("class", "pixel");
    div.style.opacity = 0;
    
    div.onmouseover = () => {
        div.style.backgroundColor = cycleRainbow();
        if(div.style.opacity != '1')
            div.style.opacity -= -0.2;
    
    };

    row.appendChild(div);
}

function createRow(colsRows)
{
    for(let i = 0; i < colsRows; i++)
    {
        const row = document.createElement("div");
        row.setAttribute("class", "row");

        for(let j = 0; j < colsRows; j++)
            createDiv(row);

        container.appendChild(row);
    }

}

function cycleRainbow() {
    if(++index >= rainbow.length)
        index = 0;

    return rainbow[index];
}

createRow(numColsRows);

function cycleOpacity() {
    if(instruction.style.opacity == '1')
    {
        instruction.style.opacity -= 0.05;
        opacityUp = false;
        return;
    }
    
    if(instruction.style.opacity == '0.1')
    {
        instruction.style.opacity -= -0.05;
        opacityUp = true;
        return;
    }

    if(opacityUp)
        instruction.style.opacity -= -0.05;
    else
        instruction.style.opacity -= 0.05;
}

const ticker = setInterval(cycleOpacity, 100);

container.onmouseover = () => {
    clearInterval(ticker);
    instruction.style.opacity = 0;
}