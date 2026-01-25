export const legalLoadRoutes = async () => {
  let components = [];
  try {
    let { AppShared } = await import("@4eplatform/shared");
    components.push(AppShared);
  } catch (error) {
    console.error("Error loading shared:", error);
  }

  try {
    let { Legal } = await import("@4eplatform/legal");
    components.push(Legal);
  } catch (error) {
    console.error("Error loading legal:", error);
  }

  try {
    let { Connect } = await import("@4eplatform/connect");
    components.push(Connect);
  } catch (error) {
    console.error("Error loading Connect:", error);
  }

  return components;
};
