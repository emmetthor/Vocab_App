export function reset_class(obj, class_name) {
    obj.classList.remove(class_name);
    void obj.offsetHeight;               // 觸發重排
    obj.classList.add(class_name);
}