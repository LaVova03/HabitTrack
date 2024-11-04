import { render, screen, fireEvent } from "@testing-library/react";
import ToDoList from "../components/ToDoList/ToDoList";

describe("toDoList component", () => {
  it("renders tasks", () => {
    const tasks = [
      { id: 1, title: "First Task" },
      { id: 2, title: "Second Task" },
    ];

    render(<ToDoList tasks={tasks} />);

    expect(screen.getByText("First Task")).toBeInTheDocument();
    expect(screen.getByText("Second Task")).toBeInTheDocument();
  });

  it("adds two numbers", () => {
    render(<ToDoList tasks={[]} />);

    const inputA = screen.getAllByRole("textbox")[0];
    const inputB = screen.getAllByRole("textbox")[1];
    const button = screen.getByText("Calculate");

    fireEvent.change(inputA, { target: { value: "7" } });
    fireEvent.change(inputB, { target: { value: "8" } });

    fireEvent.click(button);

    expect(screen.getByText("Result: 15")).toBeInTheDocument();
  });
});
