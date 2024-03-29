import { Button, Container, Image, ListGroup, Stack } from "react-bootstrap";
import {
  LoaderFunction,
  MetaFunction,
  NavLink,
  Outlet,
  json,
  useLoaderData,
} from "remix";
import default_pfp from "~/images/blank_profile.png";
import { requireUser } from "~/utils/auth.server";

export const meta: MetaFunction = () => ({
  title: "Account Details",
});

/**
 * Information on the user returned from the loader
 */
interface UserInfo {
  id: string;
  email: string;
  displayName?: string;
}

interface LoaderData {
  user: UserInfo;
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  return json<LoaderData>({
    user: {
      id: user._id.toString(),
      email: user.email,
      displayName: user.displayName,
    },
  });
};

export default function Profile() {
  const data = useLoaderData<LoaderData>();

  return (
    <Stack gap={3} direction="vertical">
      <div className="d-flex justify-content-center">
        <h1>My Profile</h1>
      </div>
      <Stack gap={3} direction="horizontal">
        <Container className="d-flex justify-content-center">
          <Image
            src={default_pfp}
            id="profilePic"
            alt="profile"
            className="img-thumbnail"
            style={{ maxWidth: "14rem" }}
          />
        </Container>
        <Container>
          <ListGroup as="ol">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Display Name</div>
                <p
                  id="displayName"
                  className={data.user.displayName ? "" : "text-muted"}
                >
                  {data.user.displayName ?? "Name not set"}
                </p>
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Email Address</div>
                <p id="emailAddress">{data.user.email}</p>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Container>
        <Container className="d-flex justify-content-between align-items-start">
          {/* add edit details function here */}
          <Button variant="primary" href="">
            Edit Details
          </Button>
        </Container>
      </Stack>
      
      <section
        className="container mx-3 mx-sm-auto mt-3 px-0 py-3 border rounded-3"
        aria-label="Details"
      >
        <nav className="border-bottom px-3 px-md-4">
          <ul className="nav nav-tabs border-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="." end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="collections">
                Collections
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="recipes">
                My Recipes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="reviews">
                My Reviews
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="p-3 p-md-4 p-lg-5" style={{ minHeight: "10rem" }}>
          <Outlet />
        </div>
      </section>
    </Stack>
  );
}
