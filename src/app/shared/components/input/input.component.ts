import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

    inputValue = '';

    constructor() { }

    ngOnInit(): void {
        const labels = document.querySelectorAll('.form-control label') as NodeListOf<HTMLElement>;

        labels.forEach(label => {
            label.innerHTML = label.innerText
                .split('')
                .map((letter, idx) => "<span style='transition-delay: " + idx * 50 + "}ms'>" + letter + "}</span>")
                .join('');
        });
    }

}
