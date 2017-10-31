# Button.js

## Props
```
<Button
    animation= /* Specifies the direction for animating the transition of `textHidden` | fromTop | fromBottom | fromLeft | fromBottom */
    autoFocus= /* Indicates if element is focused on pageload | bool */
    className= /* Passthrough for user classes. Combines with sructured classes for styling | string */
    color= /* class modifier as defined in $theme-map */ 
    disabled= /* Grants element disabled | bool */
    form= /* All 'form' props act as passthroughs for default `submit` type buttons */
    formAction=
    formEncType=
    formMethod=
    formTarget=
    formvalidate= /* Defaults to false | bool */
    handler= /* Handler/js */
    htmlType= /* Explicitly specify an HTML `type`.  Defaults to button. | 'button' | 'reset' | 'submit' | 'a'  */ 
    icon= /* FontAwesome Icon for buttons of `type` `iconLeft`, `iconRight` or `icon` | string: font-awesome icon name (include `fa-`) */
    id= /* HTML `id` passthrough */
    loading= /* Triggers button loading animation. Defaults to false */
    name= /* HTML `name` passthrough */
    size= /* Defines the button size. Defaults to `md`. Scales w/ header em ratios | `xs` | `sm` | `md` | `lg` | `xxl` */
    style= /* Button style. | `default` | `primary` | `secondary`  */
    tabIndex= /* HTML `tabindex` passthrough */
    title= /* HTML `title` passthrough */
    type= /* Button type. Defaults to text. | `text` | `iconLeft` | `iconRight` | `icon` */
    value= /* HTML `value` passthrough */
/>
```