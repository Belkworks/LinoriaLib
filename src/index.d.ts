// SIDES

declare const enum Side {
	Left = 1,
	Right = 2,
}

type Sided = {
	Side: Side;
};

// TODO: addons

// TEXTBOX

interface Textbox {
	Value: string;
	Type: "Input";

	SetValue(value: string): void;
	OnChanged(callback: Callback): void;
}

type TextboxInfo = {
	Default?: string;
	Text: string;
	Placeholder?: string;
	MaxLength?: number;
};

// BaseAddons

interface BaseAddons {}

// TOGGLE

interface Toggle extends BaseAddons {
	Value: boolean;
	Type: "Toggle";

	OnChanged(callback: Callback): void;
	SetValue(value: boolean): void;
}

type ToggleInfo = {
	Default?: boolean;
	Text: string;
	BlankSize?: number;
};

// Button

interface Button {
	SetText(text: string): void;
}

// Label

interface Label extends BaseAddons {}

// BASE GROUPBOX

interface BaseGroupbox {
	AddBlank(height: number): void;
	AddLabel(text: string): Label;
	AddButton(text: string, callback: Callback): Button;
	AddInput(option: string, info: TextboxInfo): Textbox;
	AddToggle(option: string, info: ToggleInfo): Toggle;
	// TODO: AddSlider
	// TODO: AddDropdown
}

// TAB BOX

interface TabboxTab extends BaseGroupbox {
	Show(): void;
}

interface Tabbox {
	Tabs: TabboxTab[];

	AddTab(name: string): TabboxTab;
}

type TabboxInfo = Sided & {
	Name?: string;
};

// GROUP BOX

interface Groupbox extends BaseGroupbox {}

type GroupboxInfo = Sided & {
	Name: string;
};

// TAB

interface Tab {
	Groupboxes: Record<string, Groupbox>;
	Tabboxes: Record<string, Tabbox>;
	readonly Button: Frame;

	ShowTab(): void;
	AddGroupbox(info: GroupboxInfo): Groupbox;
	AddLeftGroupbox(name: string): Groupbox;
	AddRightGroupbox(name: string): Groupbox;
	AddTabbox(info: TabboxInfo): Tabbox;
	AddLeftTabbox(name?: string): Tabbox;
	AddRightTabbox(name?: string): Tabbox;
}

// WINDOW

interface Window {
	Tabs: Record<string, Tab>;
	Holder: Frame;

	SetWindowTitle(title: string): void;
	AddTab(title: string): Tab;
	Destroy(): void;
}

// LIBRARY

interface Library {
	Options: Record<string, Textbox>; // TODO: other types
	Toggles: Record<string, Toggle>;

	SetWatermarkVisibility(visible: boolean): void;
	SetWatermark(text: string): void;
	Notify(text: string, time?: number): void;
	CreateWindow(title?: string): Window;
}

declare const Library: Library;

export = Library;
