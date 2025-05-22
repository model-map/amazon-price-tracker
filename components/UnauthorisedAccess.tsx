import Button_GoogleSignIn from "./Button_GoogleSignIn";

const UnauthorisedAccess = () => {
  // const session = await getSession();

  return (
    // IF USER IS NOT LOGGED IN
    <div className="mt-24 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* HEADING */}
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold">
          You are not Authorised to view this page
        </h1>
        {/* DESCRIPTION */}
        <p className="mt-6 text-[17px] md:text-lg text-muted-foreground">
          Please sign in with your
          <span className="text-button-1"> Google account </span>
          to access this page
        </p>
        <div className="mt-12 flex items-center justify-center w-full">
          <Button_GoogleSignIn />
        </div>
      </div>
    </div>
  );
};

export default UnauthorisedAccess;
