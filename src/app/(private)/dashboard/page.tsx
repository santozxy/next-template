import { CanServer } from "@/components/can/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "@/lib/next-auth/auth";
import { formatDate } from "@/utils/date";

export default async function Dashboard() {
  const session = await getServerSession();
  const username = session?.user.name;
  return (
    <>
      <CanServer permission={[]}>
        <Card>
          <CardHeader className="">
            <CardTitle className="text-2xl font-semibold">
              Bem vindo,
              <span className="text-primary"> {username}</span> 👋
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-description text-base">
              Bem vindo ao Template Next.js! Explore o painel para acessar as
              principais métricas e insights
            </CardDescription>
          </CardContent>
          <CardFooter>
            <p className="">
              Hoje são: {formatDate(new Date().toISOString(), "PPP 'as' HH:mm")}
            </p>
          </CardFooter>
        </Card>
      </CanServer>
    </>
  );
}
