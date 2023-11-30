import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DrawerLayout from "../../../shared/drawer/drawerLayout";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import Image from "next/image";
import {
  removeCart,
  dicreaseItem,
  increaseItem,
  removeFavorite,
  addCart,
} from "../../../../store/slices/productSlice";
import Link from "next/link";
import { useSnackbar } from "notistack";

function ProductsDrawer({
  window,
  open,
  handleDrawerToggle,
  products,
  quantity,
  type,
  title,
}) {
  const config = {
    sx: {
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: { xs: "100%", sm: 400 },
      },
    },
    anchor: "right",
  };
  const props = { window, open, handleDrawerToggle, config };

  const dispatch = useDispatch();
  const HandeleRemove = (id) => {
    if (type === "favourite") {
      dispatch(removeFavorite(id));
    } else {
      dispatch(removeCart(id));
    }
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleCart = (data) => {
    dispatch(addCart(data));
    dispatch(removeFavorite(data.id));
    enqueueSnackbar("product added to the cart", { variant: "success" });
  };

  const subtotal = products.reduce((acc, cur) => {
    acc += cur.salePrice * cur.quantity;
    return acc;
  }, 0);

  return (
    <DrawerLayout {...props}>
      <Box>
        <Stack sx={{ p: 2 }} direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h5">{title} </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <Close />
          </IconButton>
        </Stack>
        {quantity > 0 ? (
          <Box>
            <Stack gap={2} sx={{ px: { xs: 2, md: 3 }, pt: 3 }}>
              {products.map((product) => (
                <div key={product.id}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    sx={{ py: 2 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                      }}
                    >
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        height={80}
                        width={100}
                      />
                      <Stack alignItems={"center"} gap={0.5}>
                        <Typography variant="subtitle1">
                          {product.name}{" "}
                        </Typography>
                        <Stack direction={"row"} gap={1} alignItems={"center"}>
                          <Typography variant="h6">
                            ${product.salePrice}
                          </Typography>
                          {product.salePrice !== product.price ? (
                            <Typography
                              sx={{ textDecoration: "line-through" }}
                              variant="subtitle2"
                            >
                              ${product.price}
                            </Typography>
                          ) : (
                            ""
                          )}
                        </Stack>

                        {type === "cart" && (
                          <Stack direction="row" alignItems={"center"}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => {
                                dispatch(dicreaseItem(product.id));
                              }}
                            >
                              -
                            </Button>
                            <Typography sx={{ px: 2 }}>
                              {product.quantity}
                            </Typography>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => {
                                dispatch(increaseItem(product.id));
                              }}
                            >
                              +
                            </Button>
                          </Stack>
                        )}
                        {type === "favourite" && (
                          <Button
                            size="small"
                            sx={{ textDecoration: "underline" }}
                            disableRipple
                            onClick={() => handleCart(product)}
                          >
                            add to cart
                          </Button>
                        )}
                      </Stack>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => HandeleRemove(product.id)}
                    >
                      <Close />
                    </IconButton>
                  </Stack>
                  <Divider />
                </div>
              ))}
            </Stack>
            {type === "cart" && (
              <>
                <Stack
                  direction={"row"}
                  sx={{ px: 3, py: 2 }}
                  justifyContent={"space-between"}
                >
                  <Typography variant="h5"> Subtotal</Typography>
                  <Typography variant="h6"> ${subtotal} </Typography>
                </Stack>
                <Stack direction={"row"} sx={{ px: 2, pb: 2 }} gap={2}>
                  <Link href="/cart" legacyBehavior>
                    <Button variant="outlined" onClick={handleDrawerToggle}>
                      view cart
                    </Button>
                  </Link>
                  <Link href={"/checkout"} legacyBehavior>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleDrawerToggle}
                    >
                      checkout
                    </Button>
                  </Link>
                </Stack>
              </>
            )}
          </Box>
        ) : (
          <Typography textAlign={"center"}>
            {type === "cart"
              ? "your cart is empty"
              : "you don't have any favourite items"}{" "}
          </Typography>
        )}
      </Box>
    </DrawerLayout>
  );
}

export default ProductsDrawer;
