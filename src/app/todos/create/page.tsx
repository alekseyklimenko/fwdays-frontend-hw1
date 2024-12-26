import { TodoForm } from "@/components/Todo/Form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateTodo() {
    return (
        <Card>
            <CardHeader className='max-w-2xl mx-auto'>
                <CardTitle>Add new todo</CardTitle>
            </CardHeader>
            <CardContent>
                <TodoForm />
            </CardContent>
        </Card>
    );
}
