export type DropdownProps = {
  listOption:  { id: string; label: string; }[];
  selectedValue: (value: string) => void;
}