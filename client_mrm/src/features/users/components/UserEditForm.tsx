"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { User } from "../types";
import { motion } from "framer-motion";

type EditUserFormProps = {
  user: User;
  onSubmit: (data: User) => void;
};

export function EditUserForm({ user, onSubmit }: EditUserFormProps) {
  const form = useForm<User>({
    defaultValues: user,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-4xl space-y-6"
      >
        {/* Animated Main Fields */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <FormField
            control={form.control}
            name="userCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Code</FormLabel>
                <FormControl>
                  <Input className="bg-muted" readOnly placeholder="USR001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="bg-muted" readOnly type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input className="bg-muted" readOnly placeholder="admin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Animated Address Section */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeInUp}
          className="border p-4 rounded-md space-y-6"
        >
          <h4 className="font-semibold text-lg">Address</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
        >
          <Button type="submit">Update User</Button>
        </motion.div>
      </form>
    </Form>
  );
}


// "use client";

// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useForm } from "react-hook-form";
// import type { User } from "../types";

// type EditUserFormProps = {
//   user: User;
//   onSubmit: (data: User) => void;
// };

// export function EditUserForm({ user, onSubmit }: EditUserFormProps) {
//   const form = useForm<User>({
//     defaultValues: user,
//   });

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="max-w-4xl space-y-6"
//       >
//         {/* Main Fields in 2 columns on desktop */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormField
//             control={form.control}
//             name="userCode"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>User Code</FormLabel>
//                 <FormControl >
//                   <Input className="bg-muted" readOnly placeholder="USR001" {...field}/>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="fullName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Full Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="John Doe" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input className="bg-muted" readOnly type="email" placeholder="john@example.com" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="role"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Role</FormLabel>
//                 <FormControl>
//                   <Input className="bg-muted" readOnly placeholder="admin" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         {/* Address Section */}
//         <div className="border p-4 rounded-md space-y-6">
//           <h4 className="font-semibold text-lg">Address</h4>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FormField
//               control={form.control}
//               name="address.street"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Street</FormLabel>
//                   <FormControl>
//                     <Input placeholder="123 Main St" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="address.city"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>City</FormLabel>
//                   <FormControl>
//                     <Input placeholder="City" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="address.state"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>State</FormLabel>
//                   <FormControl>
//                     <Input placeholder="State" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="address.country"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Country</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Country" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="address.zip"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>ZIP</FormLabel>
//                   <FormControl>
//                     <Input placeholder="123456" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>

//         <Button type="submit">Update User</Button>
//       </form>
//     </Form>
//   );
// }
