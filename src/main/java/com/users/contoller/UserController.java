package com.users.contoller;

import com.users.model.User;
import com.users.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/")
    public String viewHomePage(Model model) {
        List<User> userList =userService.userListAll();
        model.addAttribute("userList",userList);
        User user = new User();
        model.addAttribute("user",user);
        return "index";
    }

   /* @RequestMapping("/new")
    public String viewShowNewUserPage (Model model){
        User user = new User();
        model.addAttribute("user",user);
        return "new_user";
    }*/

    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public String saveUser (@ModelAttribute ("user") User user){
        userService.save(user);
        return "redirect:/";
    }

    @RequestMapping("/edit/{id}")
    public ModelAndView showEditUserPage (@PathVariable (name = "id") Long id){
        ModelAndView modelAndView = new ModelAndView("edit_user");
        User user = userService.get(id);
        modelAndView.addObject("user",user);
        return modelAndView;
    }

    @RequestMapping("/delete/{id}")
    public String deleteUser (@PathVariable (name = "id") Long id){
        userService.delete(id);
        return "redirect:/";
    }

}
