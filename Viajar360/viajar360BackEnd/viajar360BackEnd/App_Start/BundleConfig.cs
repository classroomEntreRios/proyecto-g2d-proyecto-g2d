using System.Web;
using System.Web.Optimization;

namespace viajar360BackEnd
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
<<<<<<< HEAD

            bundles.Add(new Bundle("~/Script/Bundles").Include(
                      "~/bundles/inline.*",
                      "~/bundles/polyfills.*",
                      "~/bundles/scripts.*",
                      "~/bundles/vendor.*",
                      "~/bundles/runtime.*",
                      "~/bundles/zone.*",
                      "~/bundles/main.*"));

            bundles.Add(new StyleBundle("~/Content/Styles").Include("~/bundles/styles.*"));
=======
>>>>>>> 62734f8b2c9c9c05bf8d1f531ed11794c4f7f787
        }
    }
}
