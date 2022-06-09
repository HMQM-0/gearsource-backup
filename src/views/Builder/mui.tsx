import { Builder } from "@builder.io/react";
import {
  Alert,
  AlertColor,
  AppBar,
  Autocomplete,
  Avatar,
  Box,
  Button,
  ButtonProps,
  IconButton,
  Rating,
  Slider,
  Stack,
  Switch,
  TextField,
  TextFieldProps,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AlertIcon,
  AutoCompleteIcon,
  AvatarIcon,
  BreadcrumbIcon,
  ButtonIcon,
  CheckboxIcon,
  DrawerIcon,
  GridIcon,
  ListIcon,
  NavbarIcon,
  PaperIcon,
  RadioIcon,
  RatingIcon,
  SliderIcon,
  SwitchIcon,
  TableIcon,
  TabsIcon,
  TextfieldIcon,
} from "./icons";
import {
  InsertMenuConfig,
  InsertMenuItem,
} from "@builder.io/sdk/dist/src/builder.class";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { TaxedMoney } from "@components/containers";

export const enumsAlert = [
  { label: "error", value: "error" },
  { label: "info", value: "info" },
  { label: "success", value: "success" },
  { label: "warning", value: "warning" },
];

const enumsAppBarColor = [
  { label: "inherit", value: "inherit" },
  { label: "primary", value: "primary" },
  { label: "secondary", value: "secondary" },
  { label: "default", value: "default" },
  { label: "transparent", value: "transparent" },
];

export const enumsColor = [
  //"inherit" | "error" | "primary" | "secondary" | "info" | "success" | "warning"
  { label: "inherit", value: "inherit" },
  { label: "error", value: "error" },
  { label: "primary", value: "primary" },
  { label: "secondary", value: "secondary" },
  { label: "info", value: "info" },
  { label: "success", value: "success" },
  { label: "warning", value: "warning" },
];

const enumsPosition = [
  // "fixed" | "static" | "absolute" | "sticky" | "relative" | undefined
  { label: "fixed", value: "fixed" },
  { label: "static", value: "static" },
  { label: "absolute", value: "absolute" },
  { label: "sticky", value: "sticky" },
  { label: "relative", value: "relative" },
];

export const enumsButtonVariant = [
  { label: "contained", value: "contained" },
  { label: "outlined", value: "outlined" },
  { label: "text", value: "text" },
];

export const enumsTextFieldVariant = [
  { label: "outlined", value: "outlined" },
  { label: "standard", value: "standard" },
  { label: "filled", value: "filled" },
];

export const enumsIcon = [
  { label: "favorite", value: "favorite" },
  { label: "favoriteFilled", value: "favoriteFilled" },
  { label: "plus", value: "plus" },
  { label: "minus", value: "minus" },
];

interface AutoCompleteLabelOption {
  label: string;
}

export const BuilderTaxedMoney = (props: {
  TaxedMoney: {
    gross: { currency: string; amount: number };
    net: { currency: string; amount: number };
  };
}) => {
  return <TaxedMoney taxedMoney={props.TaxedMoney} />;
};

Builder.registerComponent(BuilderTaxedMoney, {
  name: "TaxedMoney",
  friendlyName: "Nautical TaxedMoney",
  noWrap: false, // Important!
  image: TextfieldIcon,
  inputs: [{ name: "TaxedMoney", type: "object" }],
  docsLink: "https://mui.com/components/autocomplete/",
});

export const BuilderAutoComplete = (props: {
  label: string | undefined;
  options: AutoCompleteLabelOption[] | any[];
  width: number;
}) => (
  // Important! Builder.io must add a couple classes and attributes via props.attributes
  // Important! If you add your own classes do it after ...props.attributes
  <Autocomplete
    disablePortal
    id="combo-box-demo"
    options={props.options ? props.options : []}
    sx={{ width: props.width ? props.width : 300 }}
    renderInput={(params) => (
      <TextField {...params} label={props.label ? props.label : "Label"} />
    )}
  />
);

Builder.registerComponent(BuilderAutoComplete, {
  name: "Autocomplete",
  friendlyName: "Material Autocomplete",
  noWrap: false, // Important!
  image: AutoCompleteIcon,
  inputs: [
    { name: "label", type: "string", defaultValue: "Label" },
    {
      name: "options",
      type: "list",
      subFields: [{ name: "label", type: "string" }],
    },
  ],
  docsLink: "https://mui.com/components/autocomplete/",
});

export const BuilderAlert = (props: {
  message: string;
  severity: AlertColor;
}) => (
  <Alert severity={props.severity ? props.severity : "error"}>
    {props.message ? props.message : "This is an error message!"}
  </Alert>
);

Builder.registerComponent(BuilderAlert, {
  name: "Alert",
  friendlyName: "Material Alert",
  noWrap: false, // Important!
  image: AlertIcon,
  inputs: [
    {
      name: "message",
      type: "string",
      defaultValue: "This is an error message",
    },
    {
      name: "severity",
      type: "string",
      enum: enumsAlert,
      defaultValue: "error",
    },
  ],
  docsLink: "https://mui.com/components/alert/",
});

export const BuilderAvatar = (props: {
  alt: string;
  image: string;
  size: number;
}) => {
  const sizeStyle = props.size ? props.size : 48;
  return (
    <Avatar
      alt={props.alt ? props.alt : "Alt Text"}
      src={props.image ? props.image : ""}
      sx={{ width: sizeStyle, height: sizeStyle }}
    />
  );
};

Builder.registerComponent(BuilderAvatar, {
  name: "Avatar",
  friendlyName: "Material Avatar",
  noWrap: false, // Important!
  image: AvatarIcon,
  inputs: [
    { name: "alt", type: "string", defaultValue: "Alt Text" },
    { name: "image", type: "file", allowedFileTypes: ["jpeg", "png", "svg"] },
    { name: "size", type: "number", defaultValue: 48 },
  ],
  docsLink: "https://mui.com/components/rating/",
});

export const BuilderRating = (props: { label: string; value: number }) => {
  const [value, setValue] = React.useState<number | null>(null);

  return (
    <>
      <Typography component="legend">
        {props.label ? props.label : "Label"}
      </Typography>
      <Rating
        name="simple-controlled"
        value={value ? value : props.value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </>
  );
};

Builder.registerComponent(BuilderRating, {
  name: "Rating",
  friendlyName: "Material Rating",
  noWrap: false, // Important!
  image: RatingIcon,
  inputs: [
    { name: "label", type: "string", defaultValue: "Label" },
    { name: "value", type: "number", defaultValue: 0 },
  ],
  docsLink: "https://mui.com/components/rating/",
});

export const BuilderSlider = (props: {
  label: string;
  value: number;
  showValue: boolean;
}) => {
  const [value, setValue] = React.useState<number>(props.value);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };
  return (
    <Stack spacing={2} direction="row">
      <Slider
        aria-label={props.label ? props.label : "label"}
        value={value}
        onChange={handleChange}
      />
      <Typography sx={{ display: props.showValue ? "block" : "none" }}>
        {value}
      </Typography>
    </Stack>
  );
};

Builder.registerComponent(BuilderSlider, {
  name: "Slider",
  friendlyName: "Material Slider",
  noWrap: false, // Important!
  image: SliderIcon,
  inputs: [
    { name: "label", type: "string", defaultValue: "Label" },
    { name: "value", type: "number", defaultValue: 0 },
    { name: "showValue", type: "boolean", defaultValue: true },
  ],
  docsLink: "https://mui.com/components/slider/",
});

export const BuilderTextField = (props: {
  label: string | undefined;
  variant: "outlined" | "standard" | "filled" | undefined;
  attributes: JSX.IntrinsicAttributes & TextFieldProps;
}) => (
  // Important! Builder.io must add a couple classes and attributes via props.attributes
  // Important! If you add your own classes do it after ...props.attributes
  <TextField
    label={props.label ? props.label : "Text Field"}
    variant={props.variant ? props.variant : "standard"}
    {...props.attributes}
    className={`my-class ${props.attributes.className}`}
  />
);

Builder.registerComponent(BuilderTextField, {
  name: "Textfield",
  friendlyName: "Material TextField",
  noWrap: false, // Important!
  image: TabsIcon,
  inputs: [
    { name: "label", type: "string", defaultValue: "Text Field" },
    {
      name: "variant",
      type: "string",
      defaultValue: "outlined",
      enum: enumsTextFieldVariant,
    },
  ],
});

export const BuilderButton = (props: {
  color:
    | "inherit"
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | undefined;
  variant: "text" | "contained" | "outlined" | undefined;
  label: string;
  attributes: JSX.IntrinsicAttributes & ButtonProps;
}) => (
  // Important! Builder.io must add a couple classes and attributes via props.attributes
  // Important! If you add your own classes do it after ...props.attributes
  <Button
    color={props.color ? props.color : "primary"}
    variant={props.variant ? props.variant : "contained"}
    {...props.attributes}
    className={`my-class ${props.attributes.className}`}
  >
    <Typography>{props.label ? props.label : "Submit"}</Typography>
  </Button>
);

Builder.registerComponent(BuilderButton, {
  name: "ButtonMui",
  friendlyName: "Material Button",
  noWrap: false, // Important!
  image: ButtonIcon,
  hideFromInsertMenu: true,
  inputs: [
    { name: "label", type: "string", defaultValue: "Submit" },
    {
      name: "color",
      type: "string",
      defaultValue: "primary",
      enum: enumsColor,
    },
    {
      name: "variant",
      type: "string",
      defaultValue: "contained",
      enum: enumsButtonVariant,
    },
  ],
});

export const BuilderIcon = (props: {
  name: "favorite" | "favoriteFilled" | "plus" | "minus" | "empty";
  paddingTop;
}) => {
  switch (props.name) {
    case "favorite":
      return <FavoriteBorderIcon style={{ marginTop: props.paddingTop }} />;
    case "favoriteFilled":
      return <FavoriteIcon style={{ marginTop: props.paddingTop }} />;
    case "plus":
      return <AddIcon style={{ marginTop: props.paddingTop }} />;
    case "minus":
      return <RemoveIcon style={{ marginTop: props.paddingTop }} />;
    default:
      return null;
  }
};

Builder.registerComponent(BuilderIcon, {
  name: "IconMui",
  friendlyName: "Material Icon",
  noWrap: true,
  image: ButtonIcon,
  hideFromInsertMenu: false,
  inputs: [
    { name: "name", type: "string", defaultValue: "favorite", enum: enumsIcon },
    { name: "paddingTop", type: "string" },
  ],
});

export const BuilderAppBar = (props: {
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "default"
    | "transparent"
    | undefined;
  position: "fixed" | "static" | "absolute" | "sticky" | "relative" | undefined;
  attributes: JSX.IntrinsicAttributes & TextFieldProps;
}) => (
  // Important! Builder.io must add a couple classes and attributes via props.attributes
  // Important! If you add your own classes do it after ...props.attributes
  <Box sx={{ flexGrow: 1 }}>
    <AppBar
      position={props.position ? props.position : "static"}
      color={props.color ? props.color : "primary"}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography>LOGO</Typography>
      </Toolbar>
    </AppBar>
  </Box>
);

Builder.registerBlock(BuilderAppBar, {
  name: "Navbar",
  noWrap: false, // Important!
  image: NavbarIcon,
  canHaveChildren: true,
  defaultChildren: [],
  inputs: [
    {
      name: "color",
      type: "string",
      defaultValue: "primary",
      enum: enumsAppBarColor,
    },
    {
      name: "position",
      type: "string",
      defaultValue: "static",
      enum: enumsPosition,
    },
  ],
});

// TO BE IMPLEMENTED

Builder.registerComponent(BuilderAppBar, {
  name: "Checkbox",
  noWrap: false, // Important!
  image: CheckboxIcon,
});

Builder.registerComponent(BuilderAppBar, {
  name: "Radio",
  noWrap: false, // Important!
  image: RadioIcon,
});

export const BuilderSwitch = (props: {
  "@type": "@builder.io/sdk:Element";
  color:
    | "primary"
    | "secondary"
    | "default"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined;
}) => (
  // Important! Builder.io must add a couple classes and attributes via props.attributes
  // Important! If you add your own classes do it after ...props.attributes
  <Switch color={props.color ? props.color : "primary"} />
);

Builder.registerComponent(BuilderSwitch, {
  name: "Paper",
  noWrap: false, // Important!
  image: PaperIcon,
});

Builder.registerComponent(BuilderSwitch, {
  name: "Switch",
  noWrap: false, // Important!
  image: SwitchIcon,
});

Builder.registerComponent(BuilderSwitch, {
  name: "Breadcrumb",
  noWrap: false, // Important!
  image: BreadcrumbIcon,
});

Builder.registerComponent(BuilderSwitch, {
  name: "Drawer",
  noWrap: false, // Important!
  image: DrawerIcon,
});

Builder.registerComponent(BuilderSwitch, {
  name: "Grid",
  noWrap: false, // Important!
  image: GridIcon,
});

Builder.registerComponent(BuilderSwitch, {
  name: "Table",
  noWrap: false, // Important!
  image: TableIcon,
});

Builder.registerComponent(BuilderSwitch, {
  name: "List",
  noWrap: false, // Important!
  image: ListIcon,
});

const alertMenuItem: InsertMenuItem = {
  name: "Alert",
  icon: AlertIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    component: {
      name: "Alert",
    },
  },
};

const avatarMenuItem: InsertMenuItem = {
  name: "Avatar",
  icon: AvatarIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    component: {
      name: "Avatar",
    },
  },
};

const autoCompleteMenuItem: InsertMenuItem = {
  name: "Autocomplete",
  icon: AutoCompleteIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    component: {
      name: "Autocomplete",
    },
  },
};

const buttonMenuItem: InsertMenuItem = {
  name: "Button",
  icon: ButtonIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    component: {
      name: "ButtonMui",
    },
  },
};

const checkboxMenuItem: InsertMenuItem = {
  name: "Checkbox",
  icon: CheckboxIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    component: {
      name: "Checkbox",
    },
  },
};

const ratingMenuItem: InsertMenuItem = {
  name: "Rating",
  icon: RatingIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    component: {
      name: "Rating",
    },
  },
};

const sliderMenuItem: InsertMenuItem = {
  name: "Slider",
  icon: SliderIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    component: {
      name: "Slider",
    },
  },
};

const switchMenuItem: InsertMenuItem = {
  name: "Switch",
  icon: SwitchIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    component: {
      name: "Switch",
    },
  },
};

const textFieldMenuItem: InsertMenuItem = {
  name: "Textfield",
  icon: TextfieldIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    component: {
      name: "Textfield",
    },
  },
};

const iconMenuItem: InsertMenuItem = {
  name: "Icon",
  icon: ButtonIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    component: {
      name: "IconMui",
    },
  },
};

const materialInputsMenu: InsertMenuConfig = {
  name: "Material Components",
  items: [
    alertMenuItem,
    avatarMenuItem,
    autoCompleteMenuItem,
    buttonMenuItem,
    checkboxMenuItem,
    ratingMenuItem,
    sliderMenuItem,
    switchMenuItem,
    textFieldMenuItem,
    iconMenuItem,
  ],
};

Builder.register("insertMenu", materialInputsMenu);
