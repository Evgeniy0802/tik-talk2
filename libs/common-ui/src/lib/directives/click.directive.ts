import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core'

@Directive({
	selector: '[appClick]'
})
export class ClickDirective {
	// Output-свойство, которое будет отправлять булево значение.
	// true = показать, false = скрыть.
	@Output() toggleChange = new EventEmitter<boolean>()

	// Внутренняя переменная для отслеживания текущего состояния
	private isVisible: boolean = false

	constructor(private elementRef: ElementRef) {}

	// HostListener прослушивает событие 'click' на всём документе
	@HostListener('document:click', ['$event'])
	OnClick(event: MouseEvent) {
		// Проверяем, был ли клик внутри элемента, к которому привязана директива.
		// event.target - это элемент, по которому был произведён клик.
		//Является ли элемент, по которому был сделан клик, потомком или самим элементом, к которому привязана эта директива?
		const clickedInside = this.elementRef.nativeElement.contains(event.target as HTMLElement)
		if (clickedInside) {
			// Если клик был внутри элемента, переключаем состояние
			this.isVisible = !this.isVisible
		} else {
			// Если клик был снаружи, всегда скрываем элемент
			this.isVisible = false
		}

		// Отправляем текущее состояние компоненту
		this.toggleChange.emit(this.isVisible)
	}
}
